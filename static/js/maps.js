var = map;

function initMap() {
	map = new google.maps.Map(document.getElementById("matholder"),{
		center: {lat: 12r4r24, lng 2145},
		zoom 13
	});
}

	var seattle = new google.maps.LatLng(47.6014, -122.33);
    var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

    if (navigator.geolocation) {
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeolocation(browserSupportFlag);
        });
    }
    // Browser doesn't support Geolocation
    else {
        browserSupportFlag = false;
        handleNoGeolocation(browserSupportFlag);
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag == true) {
            alert("Geolocation service failed.");
            initialLocation = newyork;
        } else {
            alert("Your browser doesn't support geolocation. We've placed you in Seattle.");
            initialLocation = seattle;
        }
        map.setCenter(initialLocation);
    }
//enagle googlemaps and places 