/**
 * Created by yuyang on 15/6/8.
 */
var express = require('express');
var router = express.Router();
var commonController = require('../controller/commonController');
var loginController = require('../controller/loginController');
var indexController = require('../controller/indexController');
var orderController = require('../controller/orderController');
var appointController = require('../controller/appointController');
var addController = require('../controller/addController');

router.get('/',function(req,res){
    res.redirect("/login");
})
    //登录、退出控制器接口
    .get('/login',loginController.index)
    .post('/login',loginController.postLogin)
    .get('/logout',commonController.userRequired,loginController.logout)
    //首页控制器接口
    .get('/Index/index',commonController.userRequired,indexController.index)
    .get('/Index/designer',commonController.userRequired,indexController.designerGet)
    .post('/Index/designer',commonController.userRequired,indexController.designerPost)
    //订单控制器接口
    .get('/Order/index',commonController.userRequired,orderController.index)
    .post('/Order/ajaxindex',commonController.userRequired,orderController.ajaxindex)
    .post('/Order/detail',commonController.userRequired,orderController.detail)
    .get('/Order/unconfirmed',commonController.userRequired,orderController.unconfirmed)
    .post('/Order/ajaxunconfirmed',commonController.userRequired,orderController.ajaxunconfirmed)
    .get('/Order/month',commonController.userRequired,orderController.month)
    .post('/Order/ajaxmonth',commonController.userRequired,orderController.ajaxmonth)
    //到店确认控制器接口
    .get('/Appoint/index',commonController.userRequired,appointController.index)
    .post('/Appoint/search',commonController.userRequired,appointController.search)
    .post('/Appoint/ajaxindex',commonController.userRequired,appointController.ajaxindex)
    .post('/Appoint/detail',commonController.userRequired,appointController.detail)
    .post('/Appoint/shampoo',commonController.userRequired,appointController.shampoo)
    .post('/Appoint/confirm',commonController.userRequired,appointController.confirm)
    //追加订单控制器接口
    .get('/Add/index',commonController.userRequired,addController.index)
    .post('/Add/confirmAdd',commonController.userRequired,addController.confirmadd)
    .get('/Add/product',commonController.userRequired,addController.product)
    .post('/Add/getInfo',commonController.userRequired,addController.getInfo)
    .post('/Add/order',commonController.userRequired,addController.order)
module.exports = router;
