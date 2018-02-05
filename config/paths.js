const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDirectory,
  appBuild: resolveApp('build/public'),
  appIndex: resolveApp('src/index.tsx'),
  appHtml: resolveApp('public/index.html')
};
