var logger = require('../utils/Logger');
var Promise = require('bluebird');
var usages = require('../data/usages.json');


var module = 'Help';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text === '0' || text === 'help' || text === 'h' || text === '帮助') {
            var res = '使用示例:\n';
            for (var i = 0; i < usages.length; i++) {
                res = res + (i+1) + '.' + usages[i] + '\n';
            }
            resolve(res);
            return;
        }
        resolve(undefined);
    });
}


