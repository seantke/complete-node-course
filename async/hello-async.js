console.log('Challenge:');

function printInTwoSeconds(message){
    setTimeut(function(){
        console.log(message);
    }, 2000);
}

printInTwoSeconds('Hello async!');
