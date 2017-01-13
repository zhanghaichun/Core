var config = require("../config/config");
var request = require('request');
var async = require('async')
var sha256 = require('js-sha256').sha256;
exports.index = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = '1';
    if(req.query && req.query.stylistId){
        param.stylistId = req.query.stylistId;
    }else{
        param.stylistId = 0;
    }
    if(req.query && req.query.status){
        param.status = req.query.status;
    }else{
        param.status = 0;
    }
    var urlList = config.SERVER_URL+'admin/getOrders';
    var urlStyList = config.SERVER_URL+'admin/getStylistInfos';
    async.series([
        function(callback){
            param.sign = sha256('username='+param.username+'&page='+param.page+'&stylistId='+param.stylistId+'&status='+param.status+'&key='+config.AES_256_KEY);
            request.post({
                url: urlList,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result.list = data_json;
                callback();
            })
        },
        function(callback){
            param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
            request.post({
                url: urlStyList,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result.stylist = data_json;
                callback();
            })
        },
        function(){
            result.page = param.page;
            result.stylistId = param.stylistId;
            result.status = param.status;
            res.render('Order/order',result);
        }
    ])
};

exports.ajaxindex = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = req.body.page;
    if(req.body && req.body.stylistId){
        param.stylistId = req.body.stylistId;
    }else{
        param.stylistId = 0;
    }
    if(req.body && req.body.status){
        param.status = req.body.status;
    }else{
        param.status = 0;
    }
    param.sign = sha256('username='+param.username+'&page='+param.page+'&stylistId='+param.stylistId+'&status='+param.status+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.list = data_json;
        result.page = param.page;
        result.stylistId = param.stylistId;
        result.status = param.status;
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

exports.unconfirmed = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = '1';
    if(req.query && req.query.stylistId){
        param.stylistId = req.query.stylistId;
    }else{
        param.stylistId = 0;
    }
    if(req.query && req.query.status){
        param.status = req.query.status;
    }else{
        param.status = 0;
    }
    var urlList = config.SERVER_URL+'admin/getPayOrders';
    var urlStyList = config.SERVER_URL+'admin/getStylistInfos';
    async.series([
        function(callback){
            param.sign = sha256('username='+param.username+'&page='+param.page+'&stylistId='+param.stylistId+'&key='+config.AES_256_KEY);
            request.post({
                url: urlList,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result.list = data_json;
                callback();
            })
        },
        function(callback){
            param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
            request.post({
                url: urlStyList,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result.stylist = data_json;
                callback();
            })
        },
        function(){
            result.page = param.page;
            result.stylistId = param.stylistId;
            result.status = param.status;
            res.render('Order/unconfirmed',result);
        }
    ])
};
exports.ajaxunconfirmed = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = req.body.page;
    if(req.body && req.body.stylistId){
        param.stylistId = req.body.stylistId;
    }else{
        param.stylistId = 0;
    }
    if(req.body && req.body.status){
        param.status = req.body.status;
    }else{
        param.status = 0;
    }
    param.sign = sha256('username='+param.username+'&page='+param.page+'&stylistId='+param.stylistId+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getPayOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.list = data_json;
        result.page = param.page;
        result.stylistId = param.stylistId;
        result.status = param.status;
        res.json(result);
    })
};

exports.month = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = '1';
    if(req.query && req.query.mtId){
        param.mtId = req.query.mtId;
    }else{
        param.mtId = 0;
    }
    if(req.query && req.query.status){
        param.status = req.query.status;
    }else{
        param.status = 0;
    }
    var urlList = config.SERVER_URL+'admin/getPageMechanicOrders';
    async.series([
        function(callback){
            param.sign = sha256('username='+param.username+'&page='+param.page+'&mtId='+param.mtId+'&key='+config.AES_256_KEY);
            request.post({
                url: urlList,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result.list = data_json;
                callback();
            })
        },
        function(){
            result.page = param.page;
            result.mtId = param.mtId;
            result.status = param.status;
            res.render('Order/month',result);
        }
    ])
};

exports.ajaxmonth = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.page = req.body.page;
    if(req.body && req.body.mtId){
        param.mtId = req.body.mtId;
    }else{
        param.mtId = 0;
    }
    if(req.body && req.body.status){
        param.status = req.body.status;
    }else{
        param.status = 0;
    }
    param.sign = sha256('username='+param.username+'&page='+param.page+'&mtId='+param.mtId+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getPageMechanicOrders';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.list = data_json;
        result.page = param.page;
        result.mtId = param.mtId;
        result.status = param.status;
        res.json(result);
    })
};
