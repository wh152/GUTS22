var a = "global"

function get_this() {
     return this
}

console.log( "This is global: " )
console.log( get_this() == global )

function put_this_b() {
     this.b = "bbbb"
	 // equivalent to b = "bbbb"
}

put_this_b()

console.log( "b: " )
console.log( b )

let o = {
     a : "local",
     get_this_a : function() { return this.a }
}

console.log( "This a from o: " )
console.log(  o.get_this_a() )





