var logger = require('../utils/Logger');
var Promise = require('bluebird');


var module = 'JFrog';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {
        var text = message.text.trim().toLowerCase();
        if (text.indexoOf('jfrog') > 0) {	
            resolve('jfrog cli is in service');
            return;
		}	

		reject('if there is no return after resolve i will be executed');
		return;
		
		// if you neither resolve nor reject, it will be waiting there for return, but no impact on new requests
        resolve(undefined);
    });
}

this.execute({text: 'helloworld'});
