function getStopData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3000/closestStops?postcode=nw51tl", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response)
    let htmlContent = "";
    for (item of response) {
        htmlContent += "<h2>"+item.busstopName+"</h2>"
        htmlContent += "<h2>Next Buses</h2>"
        htmlContent += "<table><th><td>Line Number</td><td>Time to arrive</td></th>";
        for (bus of item.nextBuses) {
            htmlContent += "<tr><td>"+ bus.line + "</td><td>"+ bus.timeToArrive +"</td></tr>";
        }
        htmlContent += "</table>"
    }
    document.getElementById("content").innerHTML = htmlContent;
}
window.onload = getStopData;

