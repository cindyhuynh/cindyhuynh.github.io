function initMap() {
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
	    center: {lat: 37.783, lng: -122.446},
	    zoom: 12
	});

    // Function for adding a marker to the page.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        return marker;
    }

    function addInfoWindow(marker, message) {
    	var location = marker;
		var infowindow = new google.maps.InfoWindow({
			content: message
		});

		google.maps.event.addListener(marker, "click", function(){
			infowindow.open(map, marker);
		});

	}

    // Testing the addMarker function
    var japanTown = new google.maps.LatLng(37.785, -122.429);
    var japanTownMarker = addMarker(japanTown);

	var goldenGate = new google.maps.LatLng(37.819, -122.478);
	var goldengateMarker = addMarker(goldenGate);

	var exploratorium = new google.maps.LatLng(37.800, -122.398);
	var exploreMarker = addMarker(exploratorium);

	var aTT = new google.maps.LatLng(37.778, -122.389);
	var attPark = addMarker(aTT);

	var cT = new google.maps.LatLng(37.794, -122.407);
	var chinaMarker = addMarker(cT);

	var ggPark = new google.maps.LatLng(37.769, -122.486);
	var gg = addMarker(ggPark);

	var union = new google.maps.LatLng(37.787, -122.407);
	var unionn = addMarker(union);

	addInfoWindow(japanTownMarker, "Japantown");
	addInfoWindow(goldengateMarker, "Golden Gate Bridge");
	addInfoWindow(exploreMarker, "Exploratorium");
	addInfoWindow(attPark, "AT&T Park");
	addInfoWindow(chinaMarker, "Chinatown");
	addInfoWindow(gg, "Golden Gate Park");
	addInfoWindow(unionn, "Union Square");
	

}
