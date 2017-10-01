var module = 'WechatUtil';
var logger = require('../utils/Logger');
var request = require('request');
var moment = require('moment');
var Promise = require('bluebird');
var fs = require('fs');

var dataDir = './data/wechat';
var infoAPI = 'https://api.weixin.qq.com/cgi-bin/user/info';
var tokenAPI = 'https://api.weixin.qq.com/cgi-bin/token';

exports.getUserProfile = function (userId, config) {
    var that = this;
    var userProfileFile = dataDir + '/profile_' + userId;
    return new Promise(function (resolve, reject) {
        fs.exists(userProfileFile, function (exists) {
            var needUpdate = false;
            var contentString;
            if (exists) {
                logger.info(module, "found profile file");
                var fileStat = fs.statSync(userProfileFile);
                if ((new Date().getTime() - fileStat.mtime.getTime()) / 1000 > 600) {
                    logger.info(module, "profile is expired");
                    needUpdate = true;
                } else {
                    logger.info(module, "profile is update to date");
                    contentString = fs.readFileSync(userProfileFile, "utf-8");
                    if (!contentString || /^\s*$/.test(contentString)) {
                        logger.info(module, "profile is not valid");
                        needUpdate = true;
                    } else {
                        var contentJson = JSON.parse(contentString);
                        if (!contentJson.openid) {
                            logger.info(module, "profile has no openid");
                            needUpdate = true;
                        }else{
                            var profile = JSON.parse(contentString);
                            logger.info(module, "use profile from file: ", profile);
                            resolve(profile);
                        }
                    }
                }
            } else {
                logger.info(module, "cannot find profile file");
                needUpdate = true;
            }

            if (needUpdate) {
                logger.info(module, "need to update profile file");
                that.getAccessToken(config).then(function (accessToken) {
                    var options = {
                        url: infoAPI,
                        qs: {
                            access_token: accessToken.access_token,
                            openid: userId
                        },
                        json: true
                    };

                    request.get(options, function (error, response, body) {
                        if (response && response.statusCode === 200) {
                            fs.writeFile(userProfileFile, JSON.stringify(body), function (err) {
                                if (err)
                                    throw err;
                                logger.info(module, "profile is updated " , body);
                            });
                            resolve(body);
                        } else {
                            logger.error(module, "get user profile error", error);
                            reject(error);
                        }
                    });
                });
            }
        });
    });
};

exports.getAccessToken = function (config) {
    var that = this;
    var accessTokenFile = dataDir + '/token_' + config.name;
    return new Promise(function (resolve, reject) {
        logger.info(module, 'try to get wechat access token');

        // wechat needs acces token to be update before two hours is reached, here I check one hour
        fs.exists(accessTokenFile, function (exists) {
            var needUpdate = false;
            if (exists) {
                logger.info(module, "found token file");
                var fileStat = fs.statSync(accessTokenFile);
                if ((new Date().getTime() - fileStat.mtime.getTime()) / 1000 > 600) {
                    logger.info(module, "token is expired");
                    needUpdate = true;
                } else {
                    logger.info(module, "token is up-to-date");
                    var access_token = fs.readFileSync(accessTokenFile, "utf-8");
                    logger.info(module, "use the token from file: " + access_token);
                    resolve({"access_token": access_token});
                }
            } else {
                logger.info(module, "cannot find token file");
                needUpdate = true;
            }

            if (needUpdate) {
                logger.info(module, "need to update token file");
                var options = {
                    url: tokenAPI,
                    qs: {
                        grant_type: 'client_credential',
                        appid: config.appId,
                        secret: config.appSecret
                    },
                    json: true
                };

                request.get(options, function (error, response, body) {
                    if (error) {
                        logger.error(module, "get token error", error);
                        reject(error);
                    } else if (response.statusCode === 200) {
                        fs.writeFile(accessTokenFile, body.access_token, function (err) {
                            if (err)
                                throw err;
                            logger.info(module, "token is updated");
                        });
                        resolve(body);
                    } else if (response.statusCode === 500) {
                        logger.error(module, "get token 500 error ", error);
                        reject(error);
                    }
                });
            }
        });
    });
};
