// more sites will be added at the end (get from some list of sites)
supportedSites = ["theguardian.co.uk", "thesun.co.uk"]
// this will be the domain name
var domainName = "example"
if (supportedSites.includes(domainName)){
    // Not sure what to do here
} else {
    chrome.browserAction.setIcon("Buttons/supported.png")
}

/*
1) check page against array of supported sites

2) if supported, get article links based on site scraping rules (html classes, ids, hierarchy)
including current page link if containing an article, and including any other article links (recommended, top stories etc)

3) send array of article links to server

4) receive ratings array, index for index

5) insert ratings based on insertion rules specific for each site
*/

alert("YOU GOT MY EXTENSION")