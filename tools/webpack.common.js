const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

// Use to turn .scss modules into a .css file for production
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: { app: [paths.appIndex] },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: paths.appDirectory
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    extractSass
  ],
  output: {
    filename: '[name].bundle.js',
    path: paths.appBuild,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              // Setup for CSS Modules
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              // Transpile .scss to .css
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // Sends through PostCSS, view postcss.config.js for list of actions applied
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './tools/postcss.config.js'
                }
              }
            }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        // Typescript Loader
        test: /\.(js|jsx|ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts']
  }
};
