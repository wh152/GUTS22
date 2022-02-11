var als_car = {type:"Fiat", model:"500", colour:"red"}

console.log( "Als car is " + als_car.colour )

let describe_car = function( some_car ) {
	return some_car.type + " " + some_car.model + " " + some_car.colour
}

console.log( "Als car is " + describe_car( als_car) )

als_car.describe = describe_car

console.log( "Als car is " + als_car.describe( als_car ) ) // Not a good way of doing this.

let better_describe_car = function() {
	return this.type + " " + this.model + " " + this.colour
}

als_car.describe = better_describe_car

console.log( "Better description is " + als_car.describe() ) // Much better

var als_other_car = {type:"Honda", model:"S2000", colour:"silver"}

// console.log( "Better description is " + als_other_car.describe() ) // oops - no function assigned - would crash system.

als_other_car.describe = better_describe_car

console.log( "Better description is " + als_other_car.describe() ) // Now OK.

// Now lets do it properly

function Car( type, model, colour ) {
	this.type = type
	this.model = model
	this.colour = colour
	this.describe = function() { return this.type + " " + this.model + " " + this.colour }  // anonymous function
}

fionas_car = new Car( "Volvo", "V40", "silver" )

console.log( "Fiona's car description is " + fionas_car.describe() ) 

function CarWithLambdas( type, model, colour ) {
	this.type = type
	this.model = model
	this.colour = colour
	this.describe = ( name ) => { return name + "'s car: " + this.type + " " + this.model + " " + this.colour } // anonymous lamda function
}

grahams_car =  new CarWithLambdas( "Honda", "CRV", "Bronze" )

console.log( grahams_car.describe("graham") ) 