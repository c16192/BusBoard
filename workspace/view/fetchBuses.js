function toMinutesSeconds(inputAsSeconds){
    inputAsInt = parseInt(inputAsSeconds, 10)
    let minutes = Math.floor(inputAsInt / 60)
    let seconds = inputAsInt % 60
    if (minutes > 0){
        return minutes.toString() + " mins " + seconds.toString() + " secs"
    } else {
        return seconds.toString() + " secs"
    }

}

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
        htmlContent += `<div class="jumbotron mt-5">`
        htmlContent+=`<h1 class="text-center mb-5">Nearby Buses</h1>`
        htmlContent += "<div class='row'>"
        for (item of data) {
            htmlContent += "<div class='col-md-6'>"
            htmlContent += `<h4 class="text-center">${item.busstopName}</h4>`
            htmlContent += "<table class='table'><tr><th scope='col'>Line Number</th><th scope='col'>Time to arrive (seconds)</th></tr>";
            for (bus of item.nextBuses) {
                let timeStyle = '';
                if (parseInt(bus.timeToArrive, 10) <= 180){
                    timeStyle = "class='arrivingSoon'"
                }
                let timeToArrive = toMinutesSeconds(bus.timeToArrive)
                htmlContent += `<tr><td ${timeStyle}>${bus.line}</td><td ${timeStyle}>${timeToArrive}</td></tr>`;
            }
            htmlContent += "</table>"
            htmlContent += "</div>"
        }
        htmlContent += "</div>"
        htmlContent += "</div>"
        document.getElementById("content").innerHTML = htmlContent;
    } else {
        let err = response.data;

        document.getElementById("content").innerHTML = err;

    }
}
window.onload = getStopData;