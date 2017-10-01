var logger = require('../utils/Logger');
var Promise = require('bluebird');
var students = require('../data/students.json');
var usages = require('../data/usages.json');

var cache = {};

var module = 'OperateNetwork';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexOf('申请') > -1) {
            var student;
            for (var i = 0; i < students.length; i++) {
                if (text.indexOf(students[i].toLowerCase()) > -1) {
                    student = students[i];
                    break;
                }
            }
            if (!student) {
                resolve(usages[8]);
                return;
            }
            var token = Math.floor(Math.random() * 10000);
            cache[message.userId] = {"lastOperation": "apply", "token": token + ''};
            resolve('验证码('+ token +')已经发送至该学号绑定的手机138****0000，请查收');
            return;
        }
        if (text.indexOf('重置') > -1) {
            var student;
            for (var i = 0; i < students.length; i++) {
                if (text.indexOf(students[i].toLowerCase()) > -1) {
                    student = students[i];
                    break;
                }
            }
            if (!student) {
                resolve(usages[9]);
                return;
            }
            var password = text.replace('重置', '').replace(student.toLowerCase(), '').trim();
            if (!password) {
                resolve(usages[9]);
                return;
            }
            var token = Math.floor(Math.random() * 10000);
            cache[message.userId] = {"lastOperation": "reset", "token": token + ''};
            resolve('验证码('+ token +')已经发送至该学号绑定的手机138****0000，请查收');
            return;
        }
        var userCache = cache[message.userId];
        if (userCache && !isNaN(text)) {
            if(text === userCache.token){
                if(userCache.lastOperation === 'apply'){
                    cache[message.userId] = undefined;
                    resolve('密码为' + Math.floor(Math.random() * 1000000));
                    return;
                }else if(userCache.lastOperation === 'reset'){
                    cache[message.userId] = undefined;
                    resolve('密码已重置');
                    return;
                }
            }else{
                resolve('验证码错误,请重新输入');
                return;
            }
        }
        // go to next service
        resolve(undefined);
    });
}


