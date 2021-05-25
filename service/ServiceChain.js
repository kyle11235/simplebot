var logger = require('../utils/Logger');
var services = require('./ServiceChain.json');
var Promise = require('bluebird');

var module = 'ServiceChain';
// should be declared here before used
chain = function (index, message, config) {
    var that = this;
    return new Promise(function (resolve, reject) {
        var service = services[index];
        logger.info(module, 'service[' + index + ']=' + service)
        if(!service){
            reject('no services');
        }else{
            require('./' + service).execute(message,config).then(function(res){
                if(res){
                    resolve(res);
                }else{
                    // call next service
                    resolve(that.chain(++index, message, config));
                }
            }).catch(function(error){
                logger.error('error catch in chain func=', error);
                resolve(error);
            });
        }
    });
}

exports.execute = function (message, config) {
    return new Promise(function (resolve, reject) {
        logger.info(module, 'raw message is ', message);
        if (!message  || !message.Content) {
            logger.info(module, 'message is empty');
            resolve('');
        }else{
            var formatMessage = {
                userId: message.FromUserName,
                text: message.Content
            };
            resolve(chain(0, formatMessage, config));
        }
    });
}


