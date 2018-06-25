function getStopData() {
    var url = new URL(window.location.href);
    let postcode = url.searchParams.get('postcode')
    document.getElementById("content").innerHTML = postcode
    if (postcode == "") {return 1;}
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3000/closestStops?postcode="+postcode, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response)
    if (response.status == 200) {
        let data = response.data
        let htmlContent = "";
        for (item of data) {
            htmlContent += "<h2>" + item.busstopName + "</h2>"
            htmlContent += "<h2>Next Buses</h2>"
            htmlContent += "<table class='table'><tr><th scope='col'>Line Number</th><th scope='col'>Time to arrive</th></tr>";
            for (bus of item.nextBuses) {
                htmlContent += "<tr><td>" + bus.line + "</td><td>" + bus.timeToArrive + "</td></tr>";
            }
            htmlContent += "</table>"
        }
        document.getElementById("content").innerHTML = htmlContent;
    } else {
        let err = response.data;

        document.getElementById("content").innerHTML = err;

    }
}
window.onload = getStopData;