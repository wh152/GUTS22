/*
 * Simple Promise example
 */

const https = require('https');

const get = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode)); 					//<<<<<------ reject called here
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));         //<<<<<------ resolve called here
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))					//<<<<<------ reject called here
    })
};


get('https://bad.bad').then(function(response) {
  console.log("Success - managed to read bad.bad!");
}, function(error) {
  console.error("Failed: could not read bad.bad");
})


get('https://al.host.cs.st-andrews.ac.uk').then(function(response) {
  console.log("Success: Got al's web page");
  // could write out the response here
  // console.log( response );
}, function(error) {
  console.error("Failed!", error);
})
