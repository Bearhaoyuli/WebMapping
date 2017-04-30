/**
 * Created by ZFu on 4/29/2017.
 */

// open and close the left panel
function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("map").style.marginLeft = "400px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("map").style.marginLeft= "0";
}



// change attraction image while change the name of the attraction in the combo box
function attractNameChange(){
    document.getElementById("attracImage").innerHTML = combo.options[combo.selectedIndex].value;
    ClearMarkers(parkMarker);
}

// function for the show attraction button
// clear former show attraction marker on map, add new show attraction marker on map,
// and show all the detailed information of the attraction on the left panel
function ShowAttraction() {
    if (showMarker !== null){
        ClearMarkers(showMarker);
    }

    document.getElementById("attracName").innerHTML = combo.options[combo.selectedIndex].text;
    document.getElementById("attracDescrip").innerHTML = combo.options[combo.selectedIndex].descript;
    document.getElementById("attracWeb").innerHTML = combo.options[combo.selectedIndex].website;

    placeShowMarker(combo.options[combo.selectedIndex].latitude, combo.options[combo.selectedIndex].longitude);

}

// show marker on the map, connecting with the show attraction button.
function placeShowMarker(Lat, Lng) {
    var img ={
        url:"http://www.myiconfinder.com/uploads/iconsets/256-256-56165014858e6dbadaf3ba00d782f125.png",
        scaledSize: new google.maps.Size(50,50)
    };
    var markerOptions = {
        position: new google.maps.LatLng(Lat, Lng),
        map:map,
        animation: google.maps.Animation.DROP,
        icon: img
    };
    var marker = new google.maps.Marker(markerOptions);
    showMarker.push(marker);
}


// function for the add attraction button
// clear former show attraction marker on map
// and add the chosen attraction to the trip plan
function AddAttraction() {
    if (showMarker !== null){
        ClearMarkers(showMarker);
    }

    document.getElementById("attracName").innerHTML = combo.options[combo.selectedIndex].text;
    document.getElementById("attracDescrip").innerHTML = combo.options[combo.selectedIndex].descript;
    document.getElementById("attracWeb").innerHTML = combo.options[combo.selectedIndex].website;

    placeAddMarker(combo.options[combo.selectedIndex].latitude, combo.options[combo.selectedIndex].longitude);
    trip.push(combo.options[combo.selectedIndex].text);

}

// show marker on the map, connecting with the add attraction button.
function placeAddMarker(Lat, Lng) {
    var img ={
        url:"http://a.dryicons.com/images/icon_sets/coquette_part_9_icons_set/png/128x128/favorite_place.png",
        scaledSize: new google.maps.Size(50,50)
    };
    var markerOptions = {
        position: new google.maps.LatLng(Lat, Lng),
        map:map,
        animation: google.maps.Animation.DROP,
        icon:img
    };
    var marker = new google.maps.Marker(markerOptions);
    attracMarker.push(marker);
}


// function for the clear markers button
function ClearMarkers(markerArray) {

    for (var i = 0; i < markerArray.length; i++){
        markerArray[i].setMap(null);
    }
    markerArray.length=0;

    document.getElementById("attracName").innerHTML = null;
    document.getElementById("attracDescrip").innerHTML = null;
    document.getElementById("attracWeb").innerHTML = null;
}