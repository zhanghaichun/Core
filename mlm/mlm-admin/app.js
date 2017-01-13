var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var index = require('./routes/index');
var config = require('./config/config')
var common = require('./controller/commonController')
var log = require('./utils/logger');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /Public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.SESSION_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: config.SESSION_SECRET,
  cookie:{maxAge:null}
}));

app.use(function (req, res, next) {
  if(req.cookies['meilamei-admin']){
    req.session.username = req.cookies['meilamei-admin'].username;
  }
  next();
});
require('./routes')(app);
// catch 404 and forward to error handler
app.get('*', function(req, res){
  log.error('页面找不到404========'+req.url + common.getClientIp(req));
  res.render('Public/error', {
    title: 'No Found'
  })
});
process.on('uncaughtException',function(err){
  log.error('系统异常',err.stack);
  console.log('系统异常',err.stack);
})

// app.listen(3000);

module.exports = app;
