$_mod.def("/myanglingnet$1.0.9/components/map-component/component", function(require, exports, module, __filename, __dirname) { module.exports = {
    onInput() {
        this.state = {
            position: {lat: -25.363, lng: 131.044},
            markers: [],
            uniqueId: 1,
            zoom: 8,
        };
    },

    onMount() {
        var infowindow;
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

        // Create a new GET request
        var mapCoordinate;
        var mapCoordinates;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4) {// && xmlHttp.status == 200) {
                mapCoordinates = JSON.parse(xmlHttp.responseText);

                for (i = 0; i < mapCoordinates.length; i++) {
                    mapCoordinate = mapCoordinates[i];
                    var myLatlng = {lat: + mapCoordinate.lat, lng: + mapCoordinate.lng};
                    
                    // Marker icon
                    var markerIcon = {
                        url: "../../static/catch-pin.png",
                        scaledSize: new google.maps.Size(32, 45),
                        origin: new google.maps.Point(0,0),
                        anchor: new google.maps.Point(15, 45)
                    };

                    // Create a marker and place it on the map
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        animation: google.maps.Animation.DROP,
                        icon:markerIcon,
                        map: map
                    });
                }

                //callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open("GET", "/mapentries", true);
        xmlHttp.send(null);

        // Add a Click handler to the Map
        map.addListener("click", function(e) {
            // Determine the location at the click position
            var location = e.latLng;
            
            // Marker icon
            var markerIcon = {
                url: "../../static/catch-pin.png",
                scaledSize: new google.maps.Size(32, 45),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(15, 45)
            };

            // Create a marker and place it on the map
            var marker = new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.DROP,
                icon:markerIcon,
                map: map
            });

            // Assign the Marker a unique id
            marker.id = uniqueId;
            uniqueId++;

            // Display current coordinates on hover
            google.maps.event.addListener(marker, "mouseover", function (e) {
                displayCoordinates(e.latLng, map, marker);
            });

            // Hide the infowindow when user leaves hover
            marker.addListener("mouseout", function() {
                infowindow.close();
            });

            // Attach click event handler to the marker
            google.maps.event.addListener(marker, "click", function (e) {    
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

            // Get the current lat/lng
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            // Restrict lat/lng values to 6dp
            lat = lat.toFixed(6);
            lng = lng.toFixed(6);

            var test = { lat, lng }

            // Create a new POST request
            xhr = new XMLHttpRequest();
            xhr.open("POST", "/mapentry");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                console.log(xhr.status + ": " + xhr.responseText);
                /*if (xhr.status === 200) {
                    alert(xhr.responseText);
                }
                else {
                    alert("Request failed and returned a status of " + xhr.status);
                }*/
            };
            xhr.send(JSON.stringify(test));
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
 
        function displayCoordinates(coordinates, map, marker) {
            var lat = coordinates.lat();
            var lng = coordinates.lng();

            lat = lat.toFixed(4);
            lng = lng.toFixed(4);

            // Create an info window object
            infowindow = new google.maps.InfoWindow({
                content: "Latitude: " + lat + "  Longitude: " + lng
            });

            // Display the info window 
            infowindow.open(map, marker);
        }
    },
};
});