// 运行 test 命令前检查静态服务有没有开启
import http from "http";
import chalk from "chalk";

const checkUrl = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        const { statusCode } = res;
        res.destroy();
        if (statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
checkUrl("http://localhost:3000").catch((err) => {
  console.log(
    chalk.red("未启动测试服务器，请先运行"),
    chalk.yellow("yarn test-server"),
    chalk.red("命令之后再运行 yarn test!")
  );
  process.exit(1);
});
