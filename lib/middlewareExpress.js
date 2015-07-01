'use strict';

var qs = require('querystring');

module.exports = function (sender) {
    if (!sender instanceof Function) {
        return function (req, res, next) {
            return next();
        };
    }
    return function (req, res, next) {
        var opt = {};
        var url = req.url;
        opt.method = req.method;
        opt.headers = req.headers;
        delete opt.headers['content-length'];
        delete opt.headers['transfer-encoding'];
        if (req.body instanceof Object && Object.keys(req.body).length > 0) {
            var body = req.body;
            if (body['null'] === '') {
                delete body['null'];
            }
            opt.body = qs.stringify(body);
        }
        try {
            sender(url, opt);
        }
        catch (e) {
            console.log(e.stack);
        }
        return next();
    };
};
