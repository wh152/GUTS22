function resolveAfter1Second() {
 console.log('resolveAfter1Second called');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('timed out');
      resolve('resolved');
    }, 1000);
  });
}

function asyncCall() {
  console.log('asyncCall called');
  var result = resolveAfter1Second().then( (res) => {
  					console.log(res);
				} )
  // expected output: 'resolved'
}

console.log('before call');
asyncCall();
console.log('after call');
