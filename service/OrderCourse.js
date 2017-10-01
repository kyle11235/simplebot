var logger = require('../utils/Logger');
var Promise = require('bluebird');
var courses = require('../data/courses.json');
var students = require('../data/students.json');
var usages = require('../data/usages.json');


var module = 'OrderCourse';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexOf('自助') > -1) {
            var date;
            var matches = text.match(/\d+/);
            if (matches && matches[0].length === 4) {
                date = matches[0];
            }
            if (!date) {
                resolve(usages[6]);
                return;
            }
            var index = Math.floor(Math.random() * 100) % courses.length;
            var res = date + '年度可选课程为:\n';
            while (index-- > 0) {
                res = res + courses[index].name + ' ' + courses[index].no + ' ' + courses[index].teacher + '\n';
            }
            resolve(res);
            return;
        }
        if (text.indexOf('选课') > -1) {
            var student;
            for (var i = 0; i < students.length; i++) {
                if (text.indexOf(students[i].toLowerCase()) > -1) {
                    student = students[i];
                    break;
                }
            }
            if (!student) {
                resolve(usages[7]);
                return;
            }
            var course;
            for (var i = 0; i < courses.length; i++) {
                if (text.indexOf(courses[i].no.toLowerCase()) > -1) {
                    course = courses[i];
                    break;
                }
            }
            if (!course) {
                resolve(usages[7]);
                return;
            }
            var date;
            var matches = text.replace(student.toLowerCase(), '').replace(course.no.toLowerCase(), '').match(/\d+/);
            if (matches && matches[0].length === 4) {
                date = matches[0];
            }
            if (!date) {
                resolve(usages[7]);
                return;
            }
            resolve("回复1 确认选课\n回复2 取消选课");
            return;
        }
        if (text === '1') {
            resolve("选课成功");
            return;
        }
        if (text === '2') {
            resolve("取消成功");
            return;
        }
        // go to next service
        resolve(undefined);
    });
}


