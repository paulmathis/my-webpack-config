import * as bodyParser from 'body-parser';
import * as history from 'connect-history-api-fallback';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import opn = require('opn');
import * as path from 'path';
// import * as  favicon from 'serve-favicon';
import * as webpack from 'webpack';
import * as webpackDevMiddleWare from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import api from './routes/api';

const app = express();

// Check if running in development
function isDev() {
  return process.env.NODE_ENV === 'development';
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Router setup
app.use('/api', api);

// Dev/Prod Check. Webpack & HMR Injected if developing, otherwise will serve generated static assets
if (isDev()) {
  const config = require('../config/webpack.dev.js');
  const compiler = webpack(config);

  app.use(history());
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
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });
}

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

export = app;
