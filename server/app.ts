// import * as bodyParser from 'body-parser';
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import express = require('express');
import logger = require('morgan');
import opn = require('opn');
import path = require('path');
// import favicon = require('serve-favicon');
import webpack = require('webpack');
import webpackDevMiddleWare = require('webpack-dev-middleware');
import webpackHotMiddleware = require('webpack-hot-middleware');

import users = require('./routes/users');
// import * as index from './routes/index';

const app = express();

// Check if running in development
function isDev() {
  return process.env.NODE_ENV === 'development';
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Webpack and HMR injected during development
// Otherwise serve static content from build proccess
if (isDev()) {
  const config = require('../config/webpack.dev.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.dev.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleWare(compiler, {
      publicPath: config.output.putblicPath
    })
  );

  app.use(webpackHotMiddleware(compiler));

  // launch browser
  opn(`http://localhost:${process.env.PORT || '3000'}`);
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
