function resolveAfter1Second() {
 console.log('resolveAfter1Second called');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('timed out');
      resolve('resolved');
    }, 1000);
  });
}

async function asyncCall() {
  console.log('asyncCall called');
  var result = await resolveAfter1Second();
  console.log(result);
  // expected output: 'resolved'
}

console.log('before call');
asyncCall();
console.log('after call');
