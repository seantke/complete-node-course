var request = require('request');
var url = 'http://ipinfo.io';

module.exports = function() {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                // console.log(body.city || body.loc);
                resolve(body);
            }
        });
    });
}
