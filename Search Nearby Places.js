/**
 * Created by ZFu on 4/29/2017.
 */


// search nearby places, in this project we just select parking places in 2000 radius
function searchPlaces() {
    // info window for search places
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: new google.maps.LatLng(combo.options[combo.selectedIndex].latitude, combo.options[combo.selectedIndex].longitude),
        radius: 2000,
        type: ['parking']
    }, callback);
}


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (document.getElementById('TravelMode').value === 'TRANSIT' || document.getElementById('TravelMode').value === 'WALKING'){
            for (var i = 0; i < parkMarker.length; i++){
                parkMarker[i].setMap(null);
            }
            parkMarker.length=0;
        }
        else{
            for (var j = 0; j < results.length; j++) {
                createMarker(results[j]);
            }
        }
    }
}


function createMarker(place) {
    var placeLoc = place.geometry.location;
    var img ={
        url:"https://www.xtreet.org/img/icn_big_marker_parking.png",
        scaledSize: new google.maps.Size(30,30)
    };
    var markerOptions = {
        position: placeLoc,
        map: map,
        icon: img
    };
    var markers = new google.maps.Marker(markerOptions);

    // create info window for nearby parking
    google.maps.event.addListener(markers, 'click', function() {
        infowindow.setContent("Parking Name: " + place.name);
        infowindow.open(map, this);
    });
    parkMarker.push(markers)
}