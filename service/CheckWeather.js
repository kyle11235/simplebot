var logger = require('../utils/Logger');
var Promise = require('bluebird');
var cities = require('../data/cities.json');
var weathers = require('../data/weathers.json');
var usages = require('../data/usages.json');


var module = 'CheckWeather';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text;
        if (text.indexOf('天气') > -1) {
            var city;
            for (var i = 0; i < cities.length; i++) {
                if (text.indexOf(cities[i]) > -1) {
                    city = cities[i];
                    break;
                }
            }
            var date;
            var matches = text.match(/\d+/);
            if (matches && matches[0].length === 8) {
                date = matches[0];
            }
            if (!city || !date) {
                resolve(usages[0]);
                return;
            }
            var index = Math.floor(Math.random() * 100) % weathers.length;
            resolve(city + ' ' + date + ' ' + weathers[index]);
            return;
        }
        // go to next service
        resolve(undefined);
    });
}




