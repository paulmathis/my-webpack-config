var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Check if running in development
function isDev() {
  return process.env.NODE_ENV === 'development';
}

// If theres no build hasn't been run kill the process and it's not developtment.
if (!fs.existsSync(path.join(__dirname, 'build')) && !isDev()) {
  console.log('App needs to be built first. Run "npm run build"');
  process.exit();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Webpack and HMR injected during development
// Otherwise serve static content from build proccess
if (isDev()) {
  const webpack = require('webpack');
  const opn = require('opn');
  const webpackDevMiddleWare = require('webpack-dev-middleware');
  const config = require('./config/webpack.dev.js');
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
  opn(`http://localhost:${process.env.PORT || '3000'}`);
} else {
  app.use(express.static(path.join(__dirname, 'build')));
}

// app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
