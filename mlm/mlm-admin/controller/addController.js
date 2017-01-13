var config = require("../config/config");
var request = require('request');
var async = require('async')
var sha256 = require('js-sha256').sha256;
var fs = require('fs');
exports.index = function(req, res) {
    var result = {};
    if(req.query.mobile) {
        result.mobile = req.query.mobile;
    }else{
        result.mobile = '';
    }
    if(req.query.product){
        result.product = req.query.product;
    }else{
        result.product = '';
    }
    res.render('Add/add',result);
};
exports.confirmadd = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.mobile = req.body.mobile;
    param.sign = sha256('username='+param.username+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/isAddOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
exports.product = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.mobile = req.query.mobile;
    param.sign = sha256('username='+param.username+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getProducts';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        data_json.mobile = param.mobile;
        res.render('Add/product',data_json);
    })
};
exports.getInfo = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.mobile = req.body.mobile;
    param.sign = sha256('username='+param.username+'&mobile='+param.mobile+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getPOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
exports.order = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.mobile = req.body.mobile;
    param.productIds = req.body.productIds;
    param.sign = sha256('username='+param.username+'&mobile='+param.mobile+'&productIds='+param.productIds+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/bookOrder';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};

