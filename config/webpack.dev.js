const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(
  {
    entry: { app: ['react-hot-loader/patch', 'webpack-hot-middleware/client'] },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: paths.appBuild,
      hot: true
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
  },
  common
);
