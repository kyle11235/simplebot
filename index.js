var module = 'MAIN';
var logger = require('./utils/Logger');
var express = require('express');
var bodyParser = require('body-parser');
var WeChatConnector = require('./connectors/WeChatConnector');
var configs = require('./configs.json');

var app = express();
app.use(bodyParser.json());

configs.forEach(function (config) {
    switch (config.client) {
        case 'WECHAT':
            config.appId = process.env['WECHAT_APPID'];
            config.appSecret = process.env['WECHAT_APPSECRET'];
            
            logger.info('config.appId=' + config.appId);
            logger.info('config.appSecret=' + config.appSecret);
            
            WeChatConnector.createBot(app, config);
            break;
    }
});

app.get('/', function(req, res) {
    res.send('running...')
});

app.get('/log', function(req, res) {
    if (req.param('url')) {
        logger.url = req.param('url');
        logger.info(module, 'log url is changed', logger.url);
        res.send('ok');
    }else{
        res.send('need url');
    }
});

app.listen(process.env.PORT || 9090, function () {
    logger.log(module, 'running...');
});

