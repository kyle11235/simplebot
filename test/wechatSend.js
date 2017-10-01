var request = require('request');
var logger = require('../utils/Logger');

var message = '<xml>\n' +
    ' <ToUserName><![CDATA[public_wechat]]></ToUserName>\n' +
    ' <FromUserName><![CDATA[onDHiwnAMbzeTeWmQpKsbuJ8B0xI]]></FromUserName>\n' +
    ' <CreateTime>1348831860</CreateTime>\n' +
    ' <MsgType><![CDATA[text]]></MsgType>\n' +
    ' <Content><![CDATA[4591]]></Content>\n' +
    ' <MsgId>1234567890123456</MsgId>\n' +
    ' </xml>';

var options = {
    url: 'http://localhost:9090/wechat/school?signature=9edeedd17b864b55dc863264b19a91af4526c20e&timestamp=school&nonce=school',
    body: message
};

request.post(options, function (error, response, body) {
	logger.info('wechatSend', 'error:' + JSON.stringify(error));
	//logger.info('wechatSend', 'response:' + JSON.stringify(response));
	logger.info('wechatSend', 'body:' + JSON.stringify(body));
});


