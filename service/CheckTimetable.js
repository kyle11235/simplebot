var logger = require('../utils/Logger');
var Promise = require('bluebird');
var clazzes = require('../data/clazzes.json');
var timetables = require('../data/timetables.json');
var usages = require('../data/usages.json');


var module = 'CheckTimetable';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexOf('课程表') > -1) {
            var clazz;
            for (var i = 0; i < clazzes.length; i++) {
                if (text.indexOf(clazzes[i]) > -1) {
                    clazz = clazzes[i];
                    break;
                }
            }
            if (!clazz) {
                resolve(usages[1]);
                return;
            }
            var date;
            var matches = text.replace(clazz, '').match(/\d+/);
            if (matches && matches[0].length === 8) {
                date = matches[0];
            }
            if (!date) {
                resolve(usages[1]);
                return;
            }
            var index = Math.floor(Math.random() * 100) % timetables.length;
            resolve(date + '课程表为' + timetables[index]);
            return;
        }
        // go to next service
        resolve(undefined);
    });
}


