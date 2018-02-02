const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
  {
    entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client'],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  },
  common
);
