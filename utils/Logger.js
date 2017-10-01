let request = require('request');
var moment = require('moment');
var Promise = require('bluebird');

exports.url = 'http://6fc21dc1.ngrok.io';

exports.debug = function (module, message, data) {
	this.log('DEBUG', module, message, data);
};

exports.info = function (module, message, data) {
		this.log('INFO', module, message, data);
};

exports.error = function (module, message, data) {
	this.log('ERROR', module, message, data);
};

exports.log = function (level, module, message, data) {
	var module = moment().format('D-MMM-YYYY HH:mm:ss SSS ') + '[' + level + '] [' + module + ']:';
	var data = (typeof data === 'undefined' ? '' : '( ' + JSON.stringify(data) + ' )');
	
	switch (level) {
	    case 'DEBUG':
	    	console.info(module, message, data);
	        break;
	    case 'INFO':
	    	console.info(module, message, data);
	        break;
	    case 'ERROR':
	    	console.error(module, message, data);
	    	break;
	}
	this.sendLog(module, message, data);
};

exports.sendLog = function(module, message, data){
	return new Promise(function (resolve, reject) {
		var body = module +  message + data;
		try {
			var options = {
					url: exports.url,
					body: body
			};
			// console.info(module, 'sending log to ' + exports.url);
			request.post(options, function (error, response, body) {});
		} catch (e) {
			
		}
		resolve();
	});
}

//this.info('Logger', 'my logger is loaded', {author: 'kyle'});
