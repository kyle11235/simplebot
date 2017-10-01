var logger = require('../utils/Logger');
var Promise = require('bluebird');


var module = 'OperateCard';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexOf('办理') > -1 || text.indexOf('补办') > -1) {
            resolve('携带学生证或身份证 到第一食堂办理');
            return;
        }
        if (text.indexOf('挂失') > -1) {
            resolve('拨打电话12348888紧急挂失，然后携带学生证或身份证 到第一食堂办理');
            return;
        }
        // go to next service
        resolve(undefined);
    });
}


