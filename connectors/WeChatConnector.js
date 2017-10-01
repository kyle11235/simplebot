var logger = require('../utils/Logger');
var serviceChain = require('../service/ServiceChain');
var request = require('request');
var Promise = require('bluebird');
var wechat = require('wechat');
var fs = require('fs');

module.exports.createBot = function(app, config){
    new WeChatConnector(app, config).start();
};

var WeChatConnector = function (app, config) {
    this.app = app;
    this.config = config;
    this.module = 'WeChat_' + this.config.name;
};

WeChatConnector.prototype.start = function () {
    var that = this;
    logger.info(that.module, 'started ...');
    that.app.use('/wechat/' + that.config.name, wechat(that.config.verifyToken, function(req, res){
        serviceChain.execute(req.weixin,that.config).then(function(botMessage){
            logger.info(that.module, 'reply to wechat', botMessage);
            res.reply(botMessage);
        }).catch(function(error){
            logger.error(that.module, error.stack);
            res.reply('service unavailable');
        });
    }));
};


