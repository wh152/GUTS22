function showPerson( person ) {
	console.log( "person: " )
	console.log( "   " + person.name )
	console.log( "   " + person.age )
	console.log( "   " + person.city)
}

function showJSON( json ) {
	console.log( "JSON: " )
	console.log( "   -->" + json + "<--" )
}

const john = {name: "John", age: 18, city: "St Andrews"};
console.log( john )

var json = JSON.stringify(john);
showPerson( john )
showJSON( json )

json = '{"name":"Betty", "age":21, "city":"St Andrews"}';
var betty = JSON.parse(json);

showPerson( betty )
showJSON( json )

