const baseURL = "http://127.0.0.1:3000";

function createLineMap() {
    var url = new URL(window.location.href);
    let lineId = url.searchParams.get('lineId')
    if (lineId == "") {return 1;}
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", baseURL + "/line?lineId="+lineId, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    console.log(response)
    if (response.status == 200) {
        document.getElementById("title").innerText = `Route of ${lineId.toUpperCase()}`
        let data = response.data
        console.log(data);
        const map = initMap(data)
        for (let position of data) {
            addMapMarker(map, position);
        }
    } else {
        let err = response.data;

        document.getElementById("content").innerHTML = err;

    }
}

function initMap(positions) {
    // The location of Uluru
    const location = getCenterLocation(positions);
    return new google.maps.Map(document.getElementById('map'), {zoom: 12, center: location});
}

function addMapMarker(map, position) {
    const location = getLocation(position);
    new google.maps.Marker({position: location, map: map});
}

const getCenterLocation = (positions)=> {
    let sumLng = 0;
    let sumLat = 0;
    for(let position of positions){
        sumLng += parseFloat(position[0]);
        sumLat += parseFloat(position[1]);
    }
    return {lng: sumLng/positions.length, lat: sumLat/positions.length}
};

const getLocation = (position)=> {
    return {lng: parseFloat(position[0]), lat: parseFloat(position[1])}
};