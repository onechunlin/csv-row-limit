# Csv Row Limit

[简体中文](./README.md)

A lightweight, fast, and pure-native CSV row count limiting library.

* **Tiny.** Very small package size, no dependencies, core code is less than 100 lines.
* **Fast.** 5-9 times faster than `fast-csv` (data based on benchmark tests below).
* **Easy to use.** Encapsulated using `async/await`, external users only need to perceive one function.
* **Stable.** Unit and benchmark tests are performed every time the package is published to ensure package stability.

## 🚀 Benchmark

```bash
$ yarn benchmark
# Get the first 100 rows out of 1000 rows
csv-row-limit limit 100 from 1000 lines      7369 ops/sec
fast-csv limit 100 from 1000 lines            796 ops/sec

# Get the first 10,000 rows out of 100,000 rows
csv-row-limit limit 1w from 10w lines         397 ops/sec
fast-csv limit 1w from 10w lines               61 ops/sec

# Get the first 100,000 rows out of 1,000,000 rows
csv-row-limit limit 10w from 100w lines        34 ops/sec
fast-csv limit 10w from 100w lines              6 ops/sec
```

Test configuration: MacBook Air (M2, 2022), macOS Monterey 12.5.1, Node.js 16.19.0.

## 🛠 Installation

```bash
yarn add csv-row-limit
```

or

```bash
npm install csv-row-limit
```

## ⌨️ Usage

```js
import { csvRowLimit } from "csv-row-limit";

async function yourFunction() {
  const rows = await csvRowLimit({
    path: './data/example.csv', // local path or HTTP address
    maxRowCount: 1000, // maximum number of rows to limit
  });
}
```

## 📗 API

- `path`: Required, the path of the CSV file. Local path or HTTP/HTTPS path.
- `maxRowCount`: Required, the maximum value of rows to limit.
- `readLineOptions`: Optional, customizable options when reading the CSV line by line, consistent with the createInterface method parameter of the readline module, see readline module for details.
- `requestOptions`: Optional, customized options when reading HTTP files, consistent with the request method parameter of the http/https module, see http module for details.


## 💻 Contribution

Very welcome to participate in the contribution of the project, let's work together for the love of electricity!

If you are interested in this project or have ideas, please feel free to create a new Issue for discussion~

## 👨‍💻 Contributors
Currently, there is only one person in the project. Welcome to co-build~

<a href="https://github.com/onechunlin/csv-row-limit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=onechunlin/csv-row-limit" />
</a>