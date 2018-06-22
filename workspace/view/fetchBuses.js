function getStopData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3000/closestStops?postcode=nw51tl", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response)
    document.getElementById("content").innerHTML = response
}
window.onload = getStopData;

