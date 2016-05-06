var argv = require('yargs').command('hello', 'Greets the user', function(yargs){
    yargs.options({
        name: {
            demand: true,
            alias: 'n',
            description: 'Your first name goes here',
            type: 'string'
        }
    }).help('help');
}).help('help').argv;
var command = argv._[0];

if(command === 'hello' && typeof argv.name !== 'undefined'){
    console.log('Hello ' + argv.name + '!');
} else if (command === 'hello'){
    console.log('Hello world!');
}
