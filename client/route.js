let myLatLng = { lat:32.099308390571736, lng: 34.82521696036913 };
let endLatLng = {lat: 32.10083953947424, lng: 34.82644780955043};

let mapOptions = {
    center: myLatLng,
    zoom: 20,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
const googleMap = document.getElementById('googleMap');
let directionsService = new google.maps.DirectionsService();
let directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

const initRoutePage= ()=> {
    calcRouteMap();
}
const calcRouteMap = async () => {
    const response = await fetch(`http://localhost:3000/route`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    calcRoute(data.locations,data.locations.length, data.families);
};

const showfamilies = (data)=>{
    const form = document.getElementById("familiesRoute");
    for (let j=0;j<data.length;j++){
        let address = `${data[j].city}, ${data[j].street} ${data[j].houseNumber}`;
        let name = data[j].name;
        let phone = data[j].phoneNumber;
        addressWaze= address.replaceAll(' ', '%20');
        console.log(`https://www.waze.com/li?q=${addressWaze}&navigate=yes&zoom=17`)
        let test = `
            <label class="list-group-item">
            <input type="checkbox" class="form-check-input me-1 routeCheck" onchange="checkboxFunc()" value=${address}>
            <u>${name}</u>
            <br>
            ${phone}
            <br>
            ${address}
            <a href="https://www.waze.com/ul?q=${addressWaze}&navigate=yes&zoom=17"
            <i class="fab fa-waze" aria-hidden="true"></i>
            </a>
            </label>
            `;

        form.innerHTML+=test;
    }

}

const finishRoute = async () => {
    const response = await fetch(`http://localhost:3000/squad`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            finished: true
        }),
    });
    if (response.status === 200) {
        alert('Excellent! You\'ve completed your entire division route, Happy holiday!', 'success', 'alertGroups');
    } else {
        alert('A server problem prevented the end of your distribution from being saved. Please contact the system administrator', 'danger', 'alertGroups');
    }
}

let btnFinished = document.getElementById("btnFinished");
if (btnFinished){
    btnFinished.addEventListener('click', finishRoute)
}

const checkboxFunc= ()=> {
    let x=0;
    let allBoxes = document.getElementsByClassName("routeCheck");
    for (let allBox of allBoxes) {
        if (allBox.checked) {
            x++;
        } else {
            x--;
            break;
        }
    }
    if (x===allBoxes.length) {
        btnFinished.disabled = false;
    }
    else {
        btnFinished.disabled = true;
    }

}

const changeMarkerColor = function(markers) {
    markers.forEach((marker, index) => {
        let checkbox = document.getElementsByClassName("routeCheck")[index];
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                marker.setIcon({
                    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
                    scaledSize: new google.maps.Size(41, 37),
                });
                marker.visible = true;
            } else {
                marker.setIcon(null);
                marker.visible = false;
            }
        });
    });
};


let markers = [];
function calcRoute(data,len, families) {
    let waypoints = [];
    for (let i=0;i<len;i++){
        waypoints.push({location: data[i]});
    };
    let request = {
        origin: myLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING',
        waypoints: waypoints,
        optimizeWaypoints: true
    }
    directionsService.route(request,function (result,status){
        if (status == google.maps.DirectionsStatus.OK){
            reorder(families,result.routes[0].waypoint_order,waypoints.length);
            reorder(waypoints,result.routes[0].waypoint_order,waypoints.length);

            showfamilies(families);
            directionsDisplay.setDirections(result);
            for (i=0;i<waypoints.length;i++){
                let marker = new google.maps.Marker({
                    position: waypoints[i].location,
                    map: map,
                    visible: false,
                });
                markers.push(marker);
            }
            changeMarkerColor(markers)
        }
    })
    openMapBtn(waypoints);
}

const openMapBtn = (data) => {
    let destinations = data.map(location => location.lat + "," + location.lng).join("|");
    let url = `https://www.google.com/maps?saddr=${myLatLng.lat},${myLatLng.lng}&daddr=${destinations}`;
    document.getElementById("openMapBtn").addEventListener("click", function() {
        window.open(url, '_blank');
    });
}

function reorder(arr, index, n) {
    var temp = [...Array(n)];
    for (let i = 0; i < n; i++) temp[index[i]] = arr[i];
    for (let i = 0; i < n; i++) {
        arr[i] = temp[i];
        index[i] = i;
    }
}
