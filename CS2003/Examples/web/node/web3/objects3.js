function Person(name, age, married, occupation) {
    this.name = name
    this.age = age
    this.married = married
    this.occupation = occupation
}

Person.prototype.is_married = function() { return this.married }
Person.prototype.get_age = function() { return this.age }


function list_properties( obj ) {
     var names = ""
     for( var i in obj )
         names += i + "\n"
     console.log( names )
}

function list_properties2( obj ) {
          for( var i in obj ) {
               console.log( i + ":" + obj[ i ] )
          }
}

// Examine the Person type

console.log( "Person constructor:" )
console.log( Person.prototype.constructor.toString() )
console.log( "Person prototype:" )
list_properties2( Person.prototype )

// Do some things with a person:

let al = new Person("al",60,true,"Professor")

console.log( "Person al:" )
list_properties2( al )

console.log( al.is_married() )
console.log( al.get_age() )

