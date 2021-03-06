var weather = require('./weather');
var location = require('./location');

var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        describe: 'Location to fetch weather for',
        type: 'string'
    })
    .help('help')
    .argv;

if (typeof argv.l === 'string' && argv.l.length > 0) {
    console.log("Location was provided.");
    weather(argv.l).then(function(currentWeather) {
        console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    });
} else {
    console.log('No location given');
    location()
        .then(function(location) {
            return weather(location.city || location.loc);
        })
        .then(function(currentWeather) {
            console.log(currentWeather);
        })
        .catch(function(error) {
            console.log(error);
        });
}
