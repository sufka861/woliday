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
    checkBoxFamilies();
}
const calcRouteMap = async () => {
    const response = await fetch(`http://localhost:3000/route/63af525f6d9851f60f732393`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    calcRoute(data,data.length);
};

const checkBoxFamilies = async () => {
    const response = await fetch(`http://localhost:3000/squad/63af525f6d9851f60f732393`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    showfamilies(data['squad'].families);
};

const showfamilies = (data)=>{
    const form = document.getElementById("familiesRoute");
    const outputArray = data.reduce((accumulator, currentValue) => {
        return [
            ...accumulator,
            {
                lat: parseFloat(currentValue.location.split(',')[0]),
                lng: parseFloat(currentValue.location.split(',')[1]),
            }
        ];
    }, []);
    for (let j=0;j<data.length;j++){
        let address = `${data[j].city}, ${data[j].street}, ${data[j].houseNumber}`;
        let label = document.createElement("label");
        label.className = "list-group-item";
        let input = document.createElement("input");
        let a = document.createElement("a");
        let i = document.createElement("i");
        input.type = "checkbox";
        input.className = "form-check-input me-1";
        input.setAttribute("value", address);
        console.log(outputArray[j].lat);
        console.log(outputArray[j].lng);
        a.href=`https://www.waze.com/ul?ll=${outputArray[j].lat},${outputArray[j].lng}&navigate=yes&zoom=17`;
        i.className="fab fa-waze";
        a.appendChild(i);
        label.appendChild(input);
        label.appendChild(document.createTextNode(address));
        label.appendChild(a);
        form.appendChild(label);
    }
    let div = document.createElement("div");
    let btn = document.createElement("button");
    btn.type="button";
    btn.className='btn btn-primary';
    div.className="myRouteSubmit";
    btn.appendChild(document.createTextNode('Finished delivery'));
    div.appendChild(btn);
    form.appendChild(div);
}

//define calcRoute function
function calcRoute(data,len) {
    let waypoints = [];
    for (let i=0;i<len;i++){
        waypoints.push({location: data[i]});
    };
    let request = {
        origin: myLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING',
        waypoints: waypoints
    }
    directionsService.route(request,function (result,status){
        if (status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections(result);
        }

    })
}

