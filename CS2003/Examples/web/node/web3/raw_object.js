let al = {     name: "Alan Dearle",
               age: 42,
               married: true,
               occupation: "University Professor"
           }

function list_properties( obj ) {
          var names = "";
          for( var i in obj )
                    names += i + "\n";
          console.log( names );
}

function list_properties2( obj ) {
          for( var i in obj ) {
               console.log( i + ":" + obj[ i ] )
          }
}
     
     
al.car = "Fiat 500"
list_properties( al )

delete al.occupation
list_properties( al )

al.age = "Al is very old"
console.log( al.age )
     
al.age = null
console.log( al.age )
list_properties( al )