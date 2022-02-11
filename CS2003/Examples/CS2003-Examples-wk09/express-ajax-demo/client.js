window.onload = function() {
    fetch("api/getHostName").
        then(res => res.json()).
        then(res => document.getElementById("hostname").innerHTML = res["hostname"])
}


function getServerTime() {
    fetch("api/getServerTime").
        then(res => res.text()).
        then(res => document.getElementById("servertime").innerHTML = res)
}
