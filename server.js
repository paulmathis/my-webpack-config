const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const open = require('open');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleWare(compiler, {
    publicPath: config.output.putblicPath
  })
);

app.use(require('webpack-hot-middleware')(compiler));

// Serve the files on port 3000.
app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n');
  open('http://localhost:3000');
});