function createLineMap() {
    var url = new URL(window.location.href);
    let lineId = url.searchParams.get('lineId')
    if (lineId == "") {return 1;}
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3000/line?lineId="+lineId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response)
    if (response.status == 200) {
        let data = response.data
        document.getElementById("content").innerHTML = data;
    } else {
        let err = response.data;

        document.getElementById("content").innerHTML = err;

    }
}
window.onload = getStopData;