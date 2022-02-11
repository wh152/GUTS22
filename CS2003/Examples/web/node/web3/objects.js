function Person(name, age, married, occupation) {
    this.name = name
    this.age = age
    this.married = married
    this.occupation = occupation
}

function list_properties( obj ) {
     var names = ""
     for( var i in obj )
         names += i + "\n"
     console.log( names )
}
 
let al = new Person("al",60,true,"Professor")

console.log( al.age )

list_properties( al )
 
Person.prototype.car = "my car"
 
console.log( al.car )
 
let bob = new Person( "bob",22,false,"lecturer")
 
let carol = new Person( "carol",23,false,"lecturer")
 
list_properties( carol )
console.log( carol.car ) 
 
bob.car = "ford"
 
console.log( bob.car )

 
