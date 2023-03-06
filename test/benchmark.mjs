import Benchmark from "benchmark";
import { csvRowLimit } from "csv-row-limit";
import { parse } from "fast-csv";
import fs from "fs";
import path from "path";
import pico from "picocolors";

async function fastCsvLimitCsv(filePath, maxLineCount) {
  const readStream = fs.createReadStream(filePath);

  return new Promise((resolve, reject) => {
    const parser = parse({ maxRows: maxLineCount });
    // 存储数据
    let rows = [];

    readStream
      .pipe(parser)
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        readStream.destroy();
        resolve(rows);
      })
      .on("error", reject);
  });
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const suite = new Benchmark.Suite();
suite
  .add("fast-csv limit 100 from 1000 lines", {
    defer: true,
    fn(defer) {
      fastCsvLimitCsv(path.resolve(__dirname, "./data/1000.csv"), 100).then(
        () => {
          defer.resolve();
        }
      );
    },
  })
  .add("csv-row-limit limit 100 from 1000 lines", {
    defer: true,
    fn(defer) {
      csvRowLimit({
        path: path.resolve(__dirname, "./data/1000.csv"),
        maxRowCount: 100,
      }).then(() => {
        defer.resolve();
      });
    },
  })
  .add("fast-csv limit 1w from 10w lines", {
    defer: true,
    fn(defer) {
      fastCsvLimitCsv(path.resolve(__dirname, "./data/10w.csv"), 10000).then(
        () => {
          defer.resolve();
        }
      );
    },
  })
  .add("csv-row-limit limit 1w from 10w lines", {
    defer: true,
    fn(defer) {
      csvRowLimit({
        path: path.resolve(__dirname, "./data/10w.csv"),
        maxRowCount: 10000,
      }).then(() => {
        defer.resolve();
      });
    },
  })
  .add("fast-csv limit 10w from 100w lines", {
    defer: true,
    fn(defer) {
      fastCsvLimitCsv(path.resolve(__dirname, "./data/100w.csv"), 100000).then(
        () => {
          defer.resolve();
        }
      );
    },
  })
  .add("csv-row-limit limit 10w from 100w lines", {
    defer: true,
    fn(defer) {
      csvRowLimit({
        path: path.resolve(__dirname, "./data/100w.csv"),
        maxRowCount: 100000,
      }).then(() => {
        defer.resolve();
      });
    },
  })
  .on("cycle", (event) => {
    const name = event.target.name.padEnd(
      "csv-row-limit limit 10w from 100w lines".length
    );
    const hz = String(event.target.hz.toFixed(0)).padStart(10);
    process.stdout.write(`${name}${pico.bold(hz)}${pico.dim(" ops/sec")}\n`);
  })
  .run({ async: true });
