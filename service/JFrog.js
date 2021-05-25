var logger = require('../utils/Logger');
var Promise = require('bluebird');
const { exec } = require('child_process');


var module = 'JFrog';
exports.execute = function (message, config) {
    logger.info(module, 'servicing...');
    return new Promise(function (resolve, reject) {

        var text = message.text.trim().toLowerCase();
        if (text.indexOf('jfrog rt') == 0) {	

            exec(text, (err, stdout, stderr) => {
                if (err) {
                  reject(err);
                  return;
                }
              
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);

                resolve(stdout);
                return;
            });
            
		}	

        // comment out to have child processs going on
		// reject('if there is no return after resolve i will be executed');
		// return;
		
		// // if you neither resolve nor reject, it will be waiting there for return, but no impact on new requests
        // resolve(undefined);
    });
}

this.execute({text: 'jfrog rt s "libs-snapshot-local/*.war" --build=maven-cli-build/2'});
