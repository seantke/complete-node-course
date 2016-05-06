var request = require('request');

module.exports = function(location) {
    return new Promise(function(resolve, reject) {
        if (!location) {
            reject("You need to enter a location!");
        }
        var url = 'http://api.openweathermap.org/data/2.5/weather?appid=327c0f8812ce159d51992dc6b45c66c8&q=' + encodeURIComponent(location) + '&units=metric'
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (error) {
                reject('Unable to fetch weather.');
            } else {
                resolve('It\'s ' + body.main.temp + ' in ' + body.name + '!');
            }
        });
    });
}
