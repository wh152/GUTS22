const port = 10111 // this is my uid (unique user id on Linux)
// find yours by running the command id
const host = '127.0.0.1'

//
// headers look like this:
// { host: '127.0.0.1:10111',
//   connection: 'close',
//   'x-real-ip': '138.251.17.194',
//   'x-forwarded-for': '138.251.17.194',
//   'x-forwarded-proto': 'https',
//   accept:
//    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//   'user-agent':
//    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Safari/605.1.15',
//   'accept-language': 'en-gb',
//   'accept-encoding': 'br, gzip, deflate',
//   cookie: 'CookieControl={"necessaryCookies":["HP_USR_SERVERID","HAP_UNI_SERVERID","CookieControl","_shibsession*"],"optionalCookies":{},"initialState":{"type":"notify"},"statement":{"shown":true,"updated":"6/8/2019"},"consentDate":1568194059618,"consentExpiry":90,"interactedWith":false,"user":"881C4291-7FF5-4D75-A4B2-989577EAA04B"}; SESSdda4e98c197cdb2d8bf5684764691561=shbu1m573el8391fk84ro9u4q2' }
//

function writeHeaders( req,res ) {
	res.write( 'headers: '  + '<br>' )
	const headers = req.headers
	res.write( '<BLOCKQUOTE>' )
	res.write( 'host : ' + headers[ 'host' ] + '<br>' )
	res.write( 'connection: ' + headers[ 'connection' ] + '<br>' )
	res.write( 'x-real-ip: ' + headers[ 'x-real-ip' ]  + '<br>' )
	res.write( 'x-forwarded-for: '  + headers[ 'x-forwarded-for' ] + '<br>' )
	res.write( 'x-forwarded-proto: ' + headers[ 'x-forwarded-proto' ] + '<br>' )
	res.write( 'accept-language: '  + headers[ 'accept-language' ] + '<br>' )
	res.write( 'accept-encoding: ' + headers[ 'accept-encoding' ] + '<br>' )
	res.write( 'user-agent: '+ headers[  'user-agent' ] + '<br>' )
	res.write( 'accept: ' + headers[ 'accept' ] + '<br>' )
	res.write( 'accept-language: ' + headers[ 'accept-language' ]  + '<br>' )
	res.write( 'accept-encoding: ' + headers[ 'accept-encoding' ] + '<br>' )
	res.write( 'cookie: ' + headers[  'cookie' ]  + '<br>' )
	res.write( '<\/BLOCKQUOTE>' )
}

var http = require('http')
http.createServer(function (req, res) {
   console.log( "Got request: " + req )
   res.writeHead(200, {'Content-Type': 'text/html'})
   res.write( '<head><\/head>' )
   res.write( '<body>' )
   res.write('Server details:' + '<br>' )
   res.write( 'port: ' + port  + '<br>' )
   res.write( 'host: ' + host  + '<br>' )
   res.write( 'http version: ' + req.httpVersion  + '<br>' )
   writeHeaders( req,res )
   res.write( 'method: ' + req.method  + '<br>' )
   res.write( 'url: ' + req.url  + '<br>' )
   res.write( '<\/body>' )
   res.end()
}).listen(port, host)
console.log('Server running')
