# Csv Row Limit

<!-- [English](./README.en.md) -->

一个轻量、快速、纯原生的 CSV 行数读取限制库。

* **小巧.** 包体积非常小，没有依赖，核心代码不到 100 行。
* **快速.** 底层仅依赖 `Node.js` 的 `readline` 模块，秉承着非必要不处理的原则，代码里不会进行过多的参数处理。
* **易用.** 使用 `async/await` 进行封装，外部用户只需要感知一个函数。
* **稳定.** 每次发包都会进行单测和基准测试，保证包的稳定性。

<!-- ## 基准测试（Benchmark）
> 待补充 -->

## 安装

```bash
yarn add csv-row-limit
```

或者

```bash
npm install csv-row-limit
```

## 使用

使用非常简单：

```js
import csvRowLimit from "csv-row-limit";

async function yourFunction() {
  const rows = await csvRowLimit({
    path: './data/example.csv', // 本地路径或者 HTTP 地址
    maxRowCount: 1000, // 限制的行数
  });
}
```

## API

- path：必填，CSV 文件的路径。本地路径或者 HTTP/HTTPS 路径。
- maxRowCount：必填，需要限制行数的最大值。
- readLineOptions：选填，按行读取 CSV 时的定制选项，和 `readline` 模块的 `createInterface` 方法参数一致，详见 [readline 模块](http://nodejs.cn/api/readline.html#readlinecreateinterfaceoptions)。
- requestOptions: 选填，读取 HTTP 文件时的自定义选项， 和`http`/`https` 模块的 `request` 方法参数一致，详见 [http 模块](http://nodejs.cn/api/http.html#httprequestoptions-callback)。