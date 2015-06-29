/**
 * @file  COPY流量
 **/

'use strict';

var got    = require('got');

var cloneRequests = module.exports = function (targets, options) {
    if (targets && !Array.isArray(targets)) {
        targets = [targets];
    }
    var requestSender = function (url, opt) {
        if (!url || !targets) {
            return;
        }
        opt = opt || {};

        if (url[0] !== '/') {
            url = '/' + url;
        }

        targets.forEach(function (target) {
            got(target + url, opt, function (err, data, resp) {
                if (options.log) {
                    options.log('Clone Request ' + url + ' to ' + target + ', status=' + resp.statusCode + (err ? ', err=' + (err.message || err) : '') + '.');
                }
                return;
            });
        });
    };

    if ('string' === typeof options.middleware && 'express' === options.middleware.toLowerCase()) {
        return require('./middlewareExpress')(requestSender);
    }
    if ('string' === typeof options.middleware && 'koa' === options.middleware.toLowerCase()) {
        return require('./middlewareKoa')(requestSender);
    }
    return requestSender();
};
