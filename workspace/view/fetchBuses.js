const baseURL = "http://127.0.0.1:3000"

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

function generateRow(bus) {
    let timeStyle = '';
    if (parseInt(bus.timeToArrive, 10) <= 180) {
        timeStyle = "class='arrivingSoon'"
    }
    let timeToArrive = toMinutesSeconds(bus.timeToArrive)
    let newBitOfContent = `<tr><td ${timeStyle}>${bus.line}</td><td ${timeStyle}>${timeToArrive}</td></tr>`;
    return newBitOfContent;
}

function getStopData() {
    const url = new URL(window.location.href);
    let postcode = url.searchParams.get('postcode');
    document.getElementById("content").innerHTML = postcode;
    if (postcode === "") {
        document.getElementById("content").innerHTML = "Enter a post code so that we can find the closest bus stops for you!"
    } else {
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", baseURL + "/closestStops?postcode="+postcode, false);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        const response = JSON.parse(xhttp.responseText);
        console.log(response);
        if (response.status === 200) {
            let data = response.data
            let htmlContent = "";
            for (item of data) {
                htmlContent += "<div class='col-md-6'>"
                htmlContent += `<h4 class="text-center">${item.busstopName}</h4>`
                htmlContent += "<table class='table'><tr><th scope='col'>Line Number</th><th scope='col'>Time to arrive (seconds)</th></tr>";
                for (let bus of item.nextBuses) {
                    htmlContent += generateRow(bus);
                }
                htmlContent += "</table>"
                htmlContent += "</div>"
            }
            document.getElementById("content").innerHTML = htmlContent;
        } else {
            let err = response.data;

            document.getElementById("content").innerHTML = err;

        }
    }

    setTimeout(getStopData, 5000)
}
window.onload = getStopData;