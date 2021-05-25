var logger = require('../utils/Logger');
var Promise = require('bluebird');


var module = 'CheckAuth';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {

        if(message.userId != process.env['WECHAT_FromUserName']){
            reject('401');
            return;
        }

		// if you neither resolve nor reject, it will be waiting there for return, but no impact on new requests
        resolve(undefined);
    });
}

this.execute({text: 'helloworld'});
