var person = {
    name: 'Andrew',
    age: 24
}

var personJSON = JSON.stringify(person);

console.log(personJSON);

var personObject = JSON.parse(personJSON);

console.log(personObject.name);
