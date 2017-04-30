/**
 * Created by ZFu on 4/29/2017.
 */

// trip route calculation function, called by the initialize map function
function tripRou() {
    var directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        // options designed for the trip route on map
        polylineOptions: {
            strokeColor: "#e8e643",
            strokeWeight: 6
        }
    });

    document.getElementById('TravelMode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    document.getElementById('submit').addEventListener('click', function() {
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay,attracMarker);

        ClearMarkers(attracMarker);
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay, attracMarker) {
    var waypts = [];
    for (var i = 0; i < attracMarker.length - 1; i++) {
        waypts.push({
            location: attracMarker[i].position,
            stopover: true
        });
    }

    var selectedMode = document.getElementById('TravelMode').value;


    var originPosition = autocompleteOrigin();
    console.log(originPosition);

    directionsService.route({
        origin: originPosition,
        destination: attracMarker[attracMarker.length - 1].position,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


// clear trip route name on the floating panel
function ClearRouteName() {
    trip.length = 0;
}


// function for the trip plan visualization on floating panel
function AddTripPlan() {
    for (var i = 0; i < trip.length; i++){
        if ( i === 0){
            tripName = trip[i].toString();
        }
        else {tripName = tripName + "<br>" + trip[i].toString();}
    }
    document.getElementById("trip_name").innerHTML = tripName;
}

// clear trip route on map, and change zoom level
function clearRoute() {
    document.getElementById("closeRoute").addEventListener("click", function initMap() {
        directionsDisplay.setMap(null);
        map.setCenter({lat: 37.782308, lng: -122.408372});
        map.setZoom(13);
        document.getElementById("trip_name").innerHTML = null;
        for (var i = 0; i < parkMarker.length; i++){
            parkMarker[i].setMap(null);
        }
    });
}


// enter the trip origin

function autocompleteOrigin() {
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('Origin'));
    autocomplete.bindTo('bounds', map);

    //var place = autocomplete.getPlace();
    return  document.getElementById('Origin').value;


    //autocomplete.addListener('place_changed', function() {
        //var place = autocomplete.getPlace();
        //var originPosition = place.geometry.location;

    //});
    //return originPosition;
}
































