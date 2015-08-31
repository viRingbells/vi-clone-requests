'use strict';

var qs = require('querystring');

module.exports = function (sender) {
    if (!(sender instanceof Function) {
        return function * (next) {
            yield next;
        }
    }
    return function * (next) {
        var opt = {};
        var url = this.url;
        opt.method = this.method;
        opt.headers = this.headers;
        delete opt.headers['content-length'];
        delete opt.headers['transfer-encoding'];
        if (this.request.body instanceof Object && Object.keys(this.request.body).length > 0) {
            var body = this.request.body;
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
        yield next;
    };
};
