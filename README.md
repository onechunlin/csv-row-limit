# Csv Row Limit

[English](./README.en.md)

一个轻量、快速、纯原生的 CSV 行数读取限制库。

* **小巧.** 包体积非常小，没有依赖，核心代码不到 100 行。
* **快速.** 比 `fast-csv` 的速度快 5-9 倍（数据基于下面的基准测试得出）。
* **易用.** 使用 `async/await` 进行封装，外部用户只需要感知一个函数。
* **稳定.** 每次发包都会进行单测和基准测试，保证包的稳定性。

## 🚀 基准测试（Benchmark）

```bash
$ yarn benchmark
# 1000 行里取前 100 行
csv-row-limit limit 100 from 1000 lines      7369 ops/sec
fast-csv limit 100 from 1000 lines            796 ops/sec

# 10w 行里取前 1w 行
csv-row-limit limit 1w from 10w lines         397 ops/sec
fast-csv limit 1w from 10w lines               61 ops/sec

# 100w 行里取前 10w 行
csv-row-limit limit 10w from 100w lines        34 ops/sec
fast-csv limit 10w from 100w lines              6 ops/sec
```

测试配置：MacBook Air（M2，2022 年）, macOS Monterey 12.5.1, Node.js 16.19.0。

## 🛠 安装

```bash
yarn add csv-row-limit
```

或者

```bash
npm install csv-row-limit
```

## ⌨️ 使用

```js
import { csvRowLimit } from "csv-row-limit";

async function yourFunction() {
  const rows = await csvRowLimit({
    path: './data/example.csv', // 本地路径或者 HTTP 地址
    maxRowCount: 1000, // 限制的行数
  });
}
```

## 📗 API

- `path`：必填，CSV 文件的路径。本地路径或者 HTTP/HTTPS 路径。
- `maxRowCount`：必填，需要限制行数的最大值。
- `readLineOptions`：选填，按行读取 CSV 时的定制选项，和 `readline` 模块的 `createInterface` 方法参数一致，详见 [readline 模块](http://nodejs.cn/api/readline.html#readlinecreateinterfaceoptions)。
- `requestOptions`: 选填，读取 HTTP 文件时的自定义选项， 和`http`/`https` 模块的 `request` 方法参数一致，详见 [http 模块](http://nodejs.cn/api/http.html#httprequestoptions-callback)。

## 💻 贡献

非常欢迎参与到项目的贡献中，一起为爱发电！

如果您对本项目感兴趣或者有想法，欢迎新建一个 [Issue](https://github.com/onechunlin/csv-row-limit/issues) 进行讨论~

## 👨‍💻 贡献者

目前项目就我一个人，欢迎共建~

<a href="https://github.com/onechunlin/csv-row-limit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=onechunlin/csv-row-limit" />
</a>