// function doWork(data, callback){
//     callback('done');
// }
//
// function doWorkPromise(data){
//     return new Promise(function(resolve, reject){
//         setTimeout(function(){
//             reject('everything is broken');
//         }, 1000);
//         // reject({
//         //     error: 'something bad happened'
//         // });
//     });
// }
//
// doWorkPromise('some data').then(function(data){
//     console.log(data);
// }, function(error){
//     console.log(error);
// });

var request = require('request');

function getWeather(location) {
    return new Promise(function(resolve, reject) {
        if (!location) {
            console.log("You need to enter a location!");
            return;
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

getWeather('new york').then(function(currentWeather) {
    console.log(currentWeather);
}, function(error) {
    console.log(error);
});
getWeather('Los Angeles').then(function(currentWeather) {
    console.log(currentWeather);
}, function(error) {
    console.log(error);
});
