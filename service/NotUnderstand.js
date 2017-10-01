var logger = require('../utils/Logger');
var Promise = require('bluebird');

var module = 'NotUnderstand';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        resolve('不好意思，暂时无法理解你的意思，如需帮助请输入0');
    });
}


