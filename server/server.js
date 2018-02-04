const express = require('express');
const open = require('open');
const opn = require('opn');
const shell = require('shelljs');
const app = express();

// If devloping use webpack with hot module reload, else point static to the dist folder
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleWare = require('webpack-dev-middleware');
  const config = require('../tools/webpack.dev.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleWare(compiler, {
      publicPath: config.output.putblicPath
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));

  // launch browser
  opn('http://localhost:3000');
} else {
  app.use(express.static('dist'));
}

// Serve the files on port 3000.
app.listen(3000, function() {
  console.log('App at http://localhost:3000\n');
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Bob',
    age: 40
  });
});
