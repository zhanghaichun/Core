var config = require("../config/config");
var request = require('request');
var async = require('async')
var sha256 = require('js-sha256').sha256;
var fs = require('fs');
var multiparty = require('multiparty');
exports.index = function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/adminHome';
    var url1 = config.SERVER_URL+'admin/getPageMechanics';
    async.series([
        function(callback){
            request.post({
                url: url,
                form: param
            },function(error,response,data){
                var data_json = JSON.parse(data);
                result = data_json;
                callback();
            })
        },
        function(callback){
            param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
            request.post({
                url: url1,
                form: param
            },function(error,response,data){

                var data_json = JSON.parse(data);
                result.mechanics = data_json;
                callback();
            })
        },
        function(){
            res.render('Index/index',result);
        }
    ])
};

exports.designerGet= function(req, res) {
    var param = {};
    var result = {};
    param.username = req.session.username;
    param.sign = sha256('username='+param.username+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/getAllStylistInfos';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        result.data = data_json;
        res.render('Index/designer',result);
    })
};

exports.designerPost = function(req, res) {
    var param = {};
    param.username = req.session.username;
    param.stylistIds = req.body.stylistIds;
    param.sign = sha256('username='+param.username+'&stylistIds='+param.stylistIds+'&key='+config.AES_256_KEY);
    var url = config.SERVER_URL+'admin/stylistAdminSet';
    request.post({
        url: url,
        form: param
    },function(error,response,data){
        var data_json = JSON.parse(data);
        res.json(data_json);
    })
};
