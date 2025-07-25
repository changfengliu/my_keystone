const semver = require("semver");
const { engines } = require("../package.json");

const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.log("\x1b[31m%s\x1b[0m", "×××××××××××××××××××××××××××××××××××××××××××××");
  console.log("\x1b[31m%s\x1b[0m", "错误: 当前 Node.js 版本不兼容！");
  console.log("\x1b[31m%s\x1b[0m", `需要 Node.js ${version}`);
  console.log("\x1b[31m%s\x1b[0m", `当前版本: ${process.version}`);
  console.log("\x1b[31m%s\x1b[0m", "请升级您的 Node.js 版本后重试");
  console.log("\x1b[31m%s\x1b[0m", "×××××××××××××××××××××××××××××××××××××××××××××");
  process.exit(1);
}
