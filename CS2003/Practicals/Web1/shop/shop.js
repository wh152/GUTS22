const root = "/cs2003\/shop\/";  // for running from my home space - you will need to change this as appropriate
const photo_root = root + "piks\/large\/";
const thumbs_root = root + "piks\/thumbnail\/";
const css_file = root + "shopfront.css";
const script_src =  root + "shopfront.js";
const stock_file_name = "./stock.txt" ;

const http = require('http');
const fs = require('fs');

const shopItems = [];

///////////////////// Process stock file ///////////////////// 

function processFileData( contents ) {
	let stringContents = String( contents );
	let lines = stringContents.split(/\r?\n/);  // forces contents into a string= from object!
	for (let index = 0; index < lines.length; index++) { 
		let line = lines[ index ]; // a line of form: crawdad,Crawdad,It's actually a 'crayfish'.,4.50
		if( line.length > 0 ) {
			let parts = line.split( "," ) // the line broken down into the individual parts
			let item = {id:parts[0], name:parts[1], comment:parts[2], price:parts[3] };
			shopItems.push( item );
		}
	}
}

function readCSV(filename) {
	fs.readFile(filename,
		function(err, contents) {
			if( err ) {
				console.log("Error reading file:" + filename );
			} else {
		       	processFileData( contents );
			}
		}
	);
}

readCSV( stock_file_name );

///////////////////// Server side generation of pages ///////////////////// 


function generatePageHeader( title ) {
	let strVar = "";
	strVar += "<head>";
	strVar += "  <meta charset=\"utf-8\">";
	strVar += "  <link rel=\"stylesheet\" href=\"" + css_file + "\" type=\"text\/css\">";
	strVar += "  <title>" + title + "<\/title>";
	strVar += "<\/head>";
	return strVar;
}

function generateTableHeader() {
	let strVar = "";
	strVar += "  <stock_item>";
	strVar += "    <item_photo class=\"heading\">Photo<\/item_photo>";
	strVar += "    <item_name class=\"heading\">Name<\/item_name>";
	strVar += "    <item_info class=\"heading\">Description<\/item_info>";
	strVar += "    <item_price class=\"heading\"> &pound; (exc. VAT)<\/item_price>";
	strVar += "    <item_quantity class=\"heading\">Quantity<\/item_quantity>";
	strVar += "    <line_cost class=\"heading\">Cost<\/line_cost>";
	strVar += "  <\/stock_item>";
	return strVar;
}

function generateStockItem( id, photo, name, comment, price, quantity, total, report ) {
		let strVar = "";
		strVar += "  <stock_item id=\"" + id + "\">";
		strVar += "    <item_photo><a href=\"" + photo_root + photo + "\"><img alt = \"" + id + "\"" + " src=\"" + thumbs_root + photo + "\" \/><\/a><\/item_photo>";
		strVar += "    <item_name>" + name + "<\/item_name>";
		strVar += "    <item_info>" + comment + "<\/item_info>";
		strVar += "    <item_price>" + price + "<\/item_price>";
		if( report ) {
			strVar += "    <item_quantity>" + quantity + "</item_quantity>";
		} else {
			strVar += "    <item_quantity><input name=\"" + id + "\" type=\"text\" value=\"0\" pattern=\"[0-9]+\" size=\"3\" onchange=\"updateCosts('" + id + "');\" \/><\/item_quantity>";
		}
		strVar += "    <line_cost>" +  total + "<\/line_cost>";
		strVar += "  <\/stock_item>";
		return strVar;
}

function wrap( str ) {
	return "\"" + str + "\"";
}

function generateStockList() {
	let strVar = "";
	strVar += "<stock_list>";
	strVar += generateTableHeader();
	
	for( let index = 0; index < shopItems.length; index++ ) {
		let item = shopItems[index];
		strVar += generateStockItem( item.id, item.id + ".jpg", item.name, item.comment, item.price, 0, 0, false);
		
	}
	strVar += "<\/stock_list>";
	return strVar;
	
}

function generateTotals() {
	let strVar = "";
	strVar += "<table id=\"costs\">";
	strVar += "<tr><td style=\"text-align: right;\">Sub-total:<span id=\"sub_total\"><\/span><\/td><\/tr>";
	strVar += "<tr><td style=\"text-align: right;\">Delivery charge:<span id=\"delivery_charge\"><\/span><\/td><\/tr>";
	strVar += "<tr><td style=\"text-align: right;\">VAT:<span id=\"vat\"><\/span><\/td><\/tr>";
	strVar += "<tr><td style=\"text-align: right;\">Total:<span id=\"total\"><\/span><\/td><\/tr>";
	strVar += "<\/table>";
	return strVar;
}

function generateCreditCardTypeInput() {
	let strVar = "";
	strVar += "<p>Credit Card type:";
	strVar += "<select name=\"cc_type\" id=\"cc_type\" size=\"1\" >";
	strVar += "<option value=\"\" selected>-<\/option>";
	strVar += "<option value=\"Mastercard\">MasterCard<\/option>";
	strVar += "<option value=\"Visa\">Visa<\/option>";
	strVar += "<\/select>";
	strVar += "<\/p>";
	return strVar;
}

function generateCreditCardNameInput() {
	let strVar = "";
	strVar += "<p>Name on Credit Card (also the name for delivery):";
	strVar += "<input type=\"text\" name=\"cc_name\" id=\"cc_name\" pattern=\"^[a-zA-Z0-9.()\\s-]{4,}$\" size=\"80\" \/>"
	strVar += "<\/p>";
	return strVar;
}

function generateCreditCardNumberInput() {
	let strVar = "";
	strVar += "<p>Credit Card number:";
	strVar += "<input type=\"text\" name=\"cc_number\" id=\"cc_number\" pattern=\"^[4-5][0-9]{15}$\" size=\"16\" \/>";
	strVar += "<\/p>";
	return strVar;
}

function generateCreditCardSecurityCodeInput() {
	let strVar = "";
	strVar += "<p>Credit Card security code:";
	strVar += "<input type=\"text\" name=\"cc_code\" id=\"cc_code\" pattern=\"^[0-9]{3}$\" size=\"3\" \/>";
	strVar += "<\/p>";
	return strVar;
}

function generateDeliveryAddressInput() {
	let strVar = "";
	strVar += "<p>Delivery street address:";
	strVar += "<input type=\"text\" name=\"delivery_address\" id=\"delivery_address\" size=\"128\" \/>";
	strVar += "<\/p>";
	return strVar;
}

function generateDeliveryPostcodeInput() {
	let strVar = "";
	strVar += "<p>Delivery postcode:";
	strVar += "<input type=\"text\" name=\"delivery_postcode\" id=\"delivery_postcode\" size=\"40\" \/>";
	strVar += "<\/p>";
	return strVar
}

function generateDeliveryCountryInput() {
	let strVar = "";
	strVar += "<p>Delivery country:";
	strVar += "<input type=\"text\" name=\"delivery_country\" id=\"delivery_country\" size=\"80\" \/>";
	strVar += "<\/p>";
	return strVar
}

function generateDeliveryEmailInput() {
	let strVar = "";
	strVar += "<p>Email:";
	strVar += "<input type=\"email\" name=\"email\" id=\"email\" pattern=\"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$\" \/>";
	strVar += "<\/p>";
	return strVar;
}

function generateOrderSubmitInput() {
	let strVar = "";
	strVar += "<div id=\"order_submit\" style=\"display: none;\">";
	strVar += "<input type=\"submit\" name=\"submit\" value=\"Press here to place your order.\" \/>";
	strVar += "<\/div> <!-- order_submit -->";
	return strVar
}

function generateForm() {
	let strVar = "";
	strVar += "<div id=\"order_list\">";				
			strVar += "<form name=\"order\" action=\"\" method=\"POST\">";
		
			strVar += generateStockList();
			strVar += "<br \/>";
			strVar += generateTotals();
			strVar += "<hr \/>";
			strVar += generateCreditCardTypeInput();
			strVar += generateCreditCardNameInput();
			strVar += generateCreditCardNumberInput();
			strVar += generateCreditCardSecurityCodeInput();
			strVar += generateDeliveryAddressInput();
			strVar += generateDeliveryPostcodeInput();
			strVar += generateDeliveryCountryInput();
			strVar += generateDeliveryEmailInput();
			strVar += "<hr \/>";
		strVar += "<\/form>"
	strVar += "<\/div> <!-- order_list -->";
	strVar += generateOrderSubmitInput();

	return strVar;
}

function generateOrderBody() {
	var strVar="";
	strVar += "<body>";
	strVar += "<h1>Items for Sale<\/h1>";
	strVar += "<hr \/>";
	strVar += generateForm();
//	strVar += "<script src=\"" + script_src + "\"><\/script>";
	strVar += "<\/body>";

	return strVar;
}

function generateOrderHTML() {
	var strVar="";
	strVar += "<!DOCTYPE html>";
	strVar += "<html>";
		strVar += generatePageHeader( "Items for Sale" );
		strVar += generateOrderBody();
	strVar += "<\/html>";
	return strVar;
}


//////////////////// Receipt generation /////////////////////


function generateReceiptHTML() {
	var strVar = "";
	strVar += "<!DOCTYPE html>";
	strVar += "<html>";
		strVar += generatePageHeader( "Receipt" );
	strVar += "<\/html>";
	return strVar;
}

function sendReply( res  ) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write( generateReceiptHTML() );
	res.end();
}

///////////////////// Request handlers ///////////////////// 

function handlePost( req, res ) {
	let html = "";
	console.log('post: ' + req.url);
	req.setEncoding('utf8');
	req.on('data', chunk => {
		console.log('Got a line of post data: ', chunk);
		html = processForm( chunk, res );
	})
	req.on('end', () => {
	   	console.log('End of Data - sending reply');
   		sendReply( res ); 
	})

}

function handleGet( req, res ) {
	console.log('get: ' + req.url);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write( generateOrderHTML() );
	res.end();
}

///////////////////// The Server ///////////////////// 

const server = http.createServer(
	function (req, res) {
		if(req.method == "GET"){ 
			handleGet( req, res );
		} else if(req.method == 'POST'){
    		handlePost( req, res );
		}
	}
);
server.listen(10111, '127.0.0.1');
console.log('Server running');



