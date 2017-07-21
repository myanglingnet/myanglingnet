module.exports = {
    onInput() {
        this.state = {
            position: {lat: -25.363, lng: 131.044},
            markers: [],
            uniqueId: 1,
            zoom: 8,
        };
    },

    onMount() {
        var styledMapType = new google.maps.StyledMapType(
            [
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": 4.5
                        }
                    ]
                }
            ],
            {name: "Styled Map"}
        )
        
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: this.state.zoom,
            center: this.state.position
        });
        
        // Associate the styled map with the MapTypeId and set it to display
        map.mapTypes.set("styled_map", styledMapType);
        map.setMapTypeId("styled_map");
        
        var markers = this.state.markers;
        var uniqueId = this.state.uniqueId;

        // Add a Click handler to the Map
        map.addListener("click", function(e) {
            // Determine the location at the click position
            var location = e.latLng;

            // Create a marker and place it on the map
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });

            // Assign the Marker a unique id
            marker.id = uniqueId;
            uniqueId++;

            // Attach click event handler to the marker
            google.maps.event.addListener(marker, "click", function (e) {
                /*var content = "Latitude: " + location.lat() + "<br />Longitude: " + location.lng();
                content += "<br /><input type = 'button' value = 'Delete' onclick = 'deleteMarker(" + marker.id + ");' value = 'Delete' />";
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                infoWindow.open(map, marker);*/
                
                // Find and remove the marker from the Array
                for (var i = 0; i < markers.length; i++) {
                    if (markers[i].id == marker.id) {
                        // Remove the marker from Map                  
                        markers[i].setMap(null);

                        // Remove the marker from array
                        markers.splice(i, 1);
                        return;
                    }
                }
            });

            // Add marker to the array
            markers.push(marker);
        });

        function deleteMarker(id) {
            // Find and remove the marker from the Array
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id == id) {
                    // Remove the marker from Map                  
                    markers[i].setMap(null);

                    // Remove the marker from array
                    markers.splice(i, 1);
                    return;
                }
            }
        }
    },

    addMarker(e, map) {
        // Determine the location at the click position
        var location = e.latLng;

        // Create a marker and place it on the map
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        // Assign the Marker a unique id
        marker.id = uniqueId;
        uniqueId++;

        // Attach click event handler to the marker
        google.maps.event.addListener(marker, "click", function (e) {
            var content = "Latitude: " + location.lat() + "<br />Longitude: " + location.lng();
            content += "<br /><input type = 'button' value = 'Delete' onclick = 'deleteMarker(" + marker.id + ");' value = 'Delete' />";
            var infoWindow = new google.maps.InfoWindow({
                content: content
            });
            infoWindow.open(map, marker);
        });

        // Add marker to the array
        markers.push(marker);
    }
};

/*  
function deleteMarker(id) {
    // Find and remove the marker from the Array
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
            // Remove the marker from Map                  
            markers[i].setMap(null);

            // Remove the marker from array
            markers.splice(i, 1);
            return;
        }
    }
}*/