function Person(name, age, married, occupation) {
    this.name = name
    this.age = age
    this.married = married
    this.occupation = occupation
    this.is_married = () => { return this.married }
}

function list_properties( obj ) {
     var names = ""
     for( var i in obj )
         names += i + "\n"
     console.log( names )
}


let al = new Person("al",60,true,"Professor")

list_properties( al )

console.log( al.is_married() )

Person.prototype.get_age = function() { return this.age }

list_properties( al )

console.log( al.get_age() )
