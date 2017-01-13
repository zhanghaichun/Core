/**
 * Created by yuyang on 15/6/8.
 */
//var admin = require('./adminRouter');
var router = require('./indexRoute');

module.exports = function (app) {
  app.use('/', router);
};