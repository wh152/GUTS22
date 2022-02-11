function resolveAfter1Second() {
 console.log('resolveAfter1Second called');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('timed out');
      resolve('resolved');
    }, 1000);
  });
}

function NOTasyncCall() {
  console.log('asyncCall called');
  var result =  resolveAfter1Second();
  console.log(result);
  // expected output: 'resolved'
}

console.log('before call');
NOTasyncCall();
console.log('after call');
