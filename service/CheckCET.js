var logger = require('../utils/Logger');
var Promise = require('bluebird');
var students = require('../data/students.json');
var grades = require('../data/grades.json');
var usages = require('../data/usages.json');


var module = 'CheckCET';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexOf('4级') > -1 || text.indexOf('6级') > -1) {
            var student;
            for (var i = 0; i < students.length; i++) {
                if (text.indexOf(students[i].toLowerCase()) > -1) {
                    student = students[i];
                    break;
                }
            }
            if (!student) {
                resolve(usages[2]);
                return;
            }
            var date;
            var matches = text.replace('4级', '').replace('6级', '').replace(student.toLowerCase(), '').match(/\d+/);
            if (matches && matches[0].length === 8) {
                date = matches[0];
            }
            if (!date) {
                resolve(usages[2]);
                return;
            }
            var index = Math.floor(Math.random() * 100) % grades.length;
            resolve(student + '在' + date + '的考试成绩为' + grades[index] + '分');
            return;
        }
        // go to next service
        resolve(undefined);
    });
}


