var aes = require("../utils/aes");
var config = require("../config/config");
var mysql = require('mysql');
var moment = require('moment')

//电话号码加密方法
exports.encrypt =function(mobile) {
    var encrypted = aes.encrypt(mobile, config.AES_KEY);
    var mm= new Buffer(encrypted, 'binary').toString('base64');
    return mm;
}
//电话号码解密方法
exports.decrypt =function(mm) {
    var decrypt= new Buffer(mm, 'base64').toString();
    var moblie = aes.decrypt(decrypt, config.AES_KEY);
    return moblie;
}
//获取用户ip方法
exports.getClientIp = function(req){
    var ipv = req.ip.split(':');
    var ip = ipv[ipv.length-1];
    return ip;
}
//各页面初始化判断session方法
exports.userRequired = function (req, res, next) {
    if (req.session.username == undefined) {
        return  res.redirect("/login");
    }
    next();
};
var pool = mysql.createPool({
    host     : '123.57.32.68',
    user     : 'root',
    password : 'ydzbroot',
    database : 'ydzb_chao',
    charset : 'utf8'
});
//mysql数据库连接
exports.mysqlQuery = function (sql,data,callback){
    pool.getConnection(function (err, connection){
        connection.query(sql,data,function (){
            callback.apply(connection, arguments);
            connection.release();
        });
    })
}
//时间戳格式化
exports.dateFormat = function (date,str) {
    return moment.unix(date).format(str);
}


