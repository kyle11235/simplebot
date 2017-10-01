var logger = require('../utils/Logger');
var wechatUtil = require('../utils/WechatUtil');
var Promise = require('bluebird');


var module = 'SayHi';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if(text === '你好' || text === 'hi' || text === 'hello'){
            wechatUtil.getUserProfile(message.userId, config).then(function (profile) {
                resolve('你好 ' + profile.nickname);
            }).catch(function(error){
                reject(error);
            });
            // make sure no code after this after your async call
            return;
        }
        resolve(undefined);
    });
}




