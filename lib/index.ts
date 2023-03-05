import readline, { ReadLineOptions } from "readline";
import http from "http";
import https, { RequestOptions } from "https";
import fs from "fs";
import { isHttp, isHttps } from "./utils";
import { Readable } from "stream";

export interface CsvRowLimitParams {
  /** 最大行数 */
  maxRowCount: number;
  /** CSV 文件地址。本地路径/HTTP 地址 */
  path: string;
  /** 读取 CSV 时的定制选项，具体可查看 http://nodejs.cn/api/readline.html#readlinecreateinterfaceoptions */
  readLineOptions?: Omit<ReadLineOptions, "input">;
  /** 读取 HTTP 文件时的自定义选项，具体可查看 http://nodejs.cn/api/http.html#httprequestoptions-callback */
  requestOptions?: RequestOptions;
}

export async function csvRowLimit<T = any>(
  params: CsvRowLimitParams
): Promise<T[]> {
  const { path } = params;

  let limitFn: (params: CsvRowLimitParams) => Promise<T[]>;
  if (isHttp(path) || isHttps(path)) {
    limitFn = httpLimit;
  } else {
    limitFn = filepathLimit;
  }
  return await limitFn(params);
}

async function filepathLimit<T = any>(params: CsvRowLimitParams): Promise<T[]> {
  const { path } = params;
  // 创建文件的可读流
  const readStream = fs.createReadStream(path);
  const rows = await getLimitRows<T>(readStream, params);
  return rows;
}

async function httpLimit<T = any>(params: CsvRowLimitParams): Promise<T[]> {
  const { path, requestOptions = {} } = params;
  const httpReq = isHttps(path) ? https : http;

  return new Promise((resolve, reject) => {
    // http.get 返回的 res 是一个  IncomingMessage，该类继承自 Readable
    const req = httpReq
      .request(path, requestOptions, (res) => {
        if (res.statusCode !== 200) {
          return reject(
            new Error(`Failed to load csv, status code: ${res.statusCode}`)
          );
        }
        getLimitRows<T>(res, params)
          .then((rows) => {
            resolve(rows);
          })
          .catch(reject);
      })
      .on("error", reject);
    req.end();
  });
}

async function getLimitRows<T>(
  stream: Readable,
  params: CsvRowLimitParams
): Promise<T[]> {
  const { maxRowCount, readLineOptions } = params;
  // 定义计数器
  let lineCount = 0;
  // 存储行数据
  let rows: T[] = [];

  return new Promise((resolve, reject) => {
    // 创建 readline 实例
    const rl = readline
      .createInterface({
        crlfDelay: Infinity, // 自动识别不同操作系统下的换行符
        ...readLineOptions,
        input: stream,
      })
      .on("line", (line) => {
        // 逐行读取文件并处理
        if (lineCount >= maxRowCount) {
          rl.close();
          return;
        }
        rows.push(line.split(",") as T);
        lineCount++;
      })
      .on("close", () => {
        stream.destroy();
        resolve(rows);
      })
      .on("error", reject);
  });
}
