class Person {
     
    constructor(name, age, married, occupation, car) {
        this.name = name
        this.age = age
        this.married = married
        this.occupation = occupation
        this.car = car
     }
      
      is_married() { return this.married == true } 
      
      inc_age() { this.age++ }
      
      get twice() {
           return this.age + this.age
      }
      
      get car() {
           return this._car
      }
      
      set car(value) {
           console.log( "setting car to " + value )
          this._car = value
      }
 }

al = new Person("al",60,true,"Prof","fiat 500" )

console.log( al.age )

al.inc_age()
 
console.log( al.age )
 
console.log( al.is_married() )
 
console.log( al.twice )