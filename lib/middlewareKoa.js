'use strict';

module.exports = function (sender) {
    if (!(sender instanceof Function) {
        return function * (next) {
            yield next;
        }
    }
    return function * (next) {
        var opt = {};
        var url = this.url;
        opt.headers = req.headers;
        if (this.request.body instanceof Object && Object.keys(this.request.body).elngth > 0) {
            opt.body = JSON.parse(this.request.body);
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
