var myLatLng = { lat:32.099308390571736, lng: 34.82521696036913 };
let endLatLng = {lat: 32.10083953947424, lng: 34.82644780955043};

let mapOptions = {
    center: myLatLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
let directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
let directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

const initRoutePage= ()=> {
    calcRouteMap();
    //checkBoxFamilies();
}
const calcRouteMap = async () => {
    const response = await fetch(`http://localhost:3000/route/63af525f6d9851f60f732393`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    calcRoute(data.locations,data.locations.length, data.families);
};


const showfamilies = (data,waypoints)=>{
    const form = document.getElementById("familiesRoute");
    for (let j=0;j<data.length;j++){
        let address = `${data[j].city}, ${data[j].street} ${data[j].houseNumber}`;
        let name = data[j].name;
        let phone = data[j].phoneNumber;
        let test = `
            <label class="list-group-item">
            <input type="checkbox" class="form-check-input me-1" value="address">
            <u>${name}</u>
            <br>
            ${phone}
            <br>
            ${address}
            <a href="https://www.waze.com/ul?ll=${waypoints[j].lat}%${waypoints[j].lng}&navigate=yes&zoom=17";
            <i class="fab fa-waze" aria-hidden="true"></i>
            </a>
            </label>
            `;

        form.innerHTML+=test;
    }
}

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
            directionsDisplay.setDirections(result);
            reorder(families,result.routes[0].waypoint_order,waypoints.length);
            reorder(waypoints,result.routes[0].waypoint_order,waypoints.length);
            showfamilies(families,waypoints);

        }
    })
}
function reorder(arr, index, n) {
    var temp = [...Array(n)];

    // arr[i] should be present at index[i] index
    for (var i = 0; i < n; i++) temp[index[i]] = arr[i];

    // Copy temp[] to arr[]
    for (var i = 0; i < n; i++) {
        arr[i] = temp[i];
        index[i] = i;
    }
}

const filter = ()=> {
    let input, filter, table, tr, td, i,j, txtValue;
    input = document.getElementById("wantedUser");
    filter = input.value.toUpperCase();
    table = document.getElementById("usersTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
