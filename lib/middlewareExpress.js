'use strict';

module.exports = function (sender) {
    if (!sender instanceof Function) {
        return function (req, res, next) {
            return next();
        };
    }
    return function (req, res, next) {
        var opt = {};
        var url = req.url;
        opt.headers = req.headers;
        if (req.body instanceof Object && Object.keys(req.body).length > 0) {
            opt.body = JSON.stringify(req.body);
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
