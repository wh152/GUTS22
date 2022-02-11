
if ([] + [] == []) { console.log("[] + [] == [] is true") }
else { console.log("[] + [] == [] is false") }

if ([] + {} == {}) { console.log("[] + {} == {} is true") }
else { console.log("[] + {} == {} is false") }

if ({} + [] == {}) { console.log("{} + [] == {} is true") }
else { console.log("{} + [] == {} is false") }

if ({} + {} == {}) { console.log("{} + {} == {} is true") }
else { console.log("{} + {} == {} is false") }

console.log("[] + [] == [] is ", [] + [] == []);
console.log("[] + {} == {} is ", [] + {} == {});
console.log("{} + [] == {} is ", {} + [] == {});
console.log("{} + {} == {} is ", {} + {} == {});


console.log("[] + [] === [] is ", [] + [] === []);
console.log("[] + {} === {} is ", [] + {} === {});
console.log("{} + [] === {} is ", {} + [] === {});
console.log("{} + {} === {} is ", {} + {} === {});
