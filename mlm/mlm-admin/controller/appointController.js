var config = require("../config/config");
var request = require('request');
var sha256 = require('js-sha256').sha256;
exports.index = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = '1';
    param.orderNo = "";
    param.mobile = "";
    param.sign = sha256('username='+param.username+'&page='+param.page+'&orderNo='+param.orderNo+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getAppointOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.page = param.page;
        result.list = data_json;
        res.render('Appoint/appoint',result);
    })
};
exports.search = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = '1';
    param.orderNo = req.body.orderCode;
    param.mobile = req.body.userPhone;
    param.sign = sha256('username='+param.username+'&page='+param.page+'&orderNo='+param.orderNo+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getAppointOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.page = param.page;
        result.list = data_json;
        res.json(result);
    })
};
exports.ajaxindex = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = req.body.page;
    param.orderNo = req.body.orderCode;
    param.mobile = req.body.userPhone;
    param.sign = sha256('username='+param.username+'&page='+param.page+'&orderNo='+param.orderNo+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getAppointOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.page = param.page;
        result.list = data_json;
        res.json(result);
    })
};
exports.detail = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.mobile = req.body.styPhone;
    param.orderId = req.body.orderId;
    param.sign = sha256('username='+param.username+'&mobile='+param.mobile+'&orderId='+param.orderId+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getOrdersByOrderId';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
exports.shampoo = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getMechanics';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })

};
exports.confirm = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.orderId = req.body.orderId;
    param.mtId = req.body.mtId;
    param.sign = sha256('username='+param.username+'&orderId='+param.orderId+'&mtId='+param.mtId+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/confirmOrder';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })

};
