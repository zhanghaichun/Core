var common = require('./commonController');
var config = require("../config/config");
var request = require('request');
var sha256 = require('js-sha256').sha256;
//登录页面数据---初始化加载
exports.index = function(req, res) {
    var result = {};
    if(req.session.username){
        res.redirect("Index/index");
    }else {
        res.render('Public/login');
    }
};
//登录页面---登录方法
exports.postLogin = function(req, res) {
    var param = {};
    var result = {};
    param.username= req.body.username;
    param.passwd = req.body.password;
    param.sign = sha256('username='+param.username+'&passwd='+param.passwd+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/login';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        if(data_json['isSuccess']){
            req.session.username = param.username;
            res.cookie("meilamei-admin",{username:param.username},{ maxAge: 60*60*24*1000,httpOnly:true, path:'/'});
            result.status = 1;
            result.msg = '登录成功';
        }else{
            result.status = 0;
            result.msg = data_json['errors'][0];
        }
        res.json(result);
    })
};
//忘记密码页面---初始化加载
exports.forgetIndex = function(req, res) {
    if(req.session.member_mobile){
        res.redirect("/Index/index");
    }else {
        res.render('Public/forget');
    }
};
//忘记密码页面----获取验证信息方法
exports.getMsgForget = function(req, res) {
    var param = {};
    param.mobile= req.query.mobile;
    param.sign = sha256('mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'stmanager/authcode';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
//忘记密码页面----忘记密码方法
exports.forgetSubmit = function(req, res) {
    var param = {};
    param.mobile= req.body.mobile;
    param.authcode= req.body.vcode;
    param.newpasswd= req.body.psw;
    param.sign = sha256('mobile='+param.mobile+'&authcode='+param.authcode+'&newpasswd='+param.newpasswd+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'stmanager/forgetPasswd';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
//用户中心页面----退出方法
exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.cookie("meilamei-admin",'')
        res.redirect("/login");
    })
};
