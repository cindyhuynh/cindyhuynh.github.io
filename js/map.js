function initMap() {
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
	    center: {lat: 37.783, lng: -122.446},
	    zoom: 12
	});

    // Function for adding a marker to the page.
    function addMarker(location) {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

    // Testing the addMarker function
    JapanTown = new google.maps.LatLng(37.785, -122.429);
    addMarker(JapanTown);

	GoldenGate = new google.maps.LatLng(37.819, -122.478);
	addMarker(GoldenGate);

	Exploratorium = new google.maps.LatLng(37.800, -122.398);
	addMarker(Exploratorium);

	ATT = new google.maps.LatLng(37.778, -122.389);
	addMarker(ATT);

	GGPark = new google.maps.LatLng(37.769, -122.486);
	addMarker(GGPark);


}
