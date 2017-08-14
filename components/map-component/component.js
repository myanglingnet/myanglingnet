var map;

module.exports = {
    onInput() {
        this.state = {
            position: {lat: -39.5924556, lng: 176.8277294},
            markers: [],
            mapEntryId: 1,
            zoom: 11,
        };
    },

    onMount() {
        // Map settings
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
            { name: "Styled Map" }
        )

        // Create the map
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: this.state.zoom,
            center: this.state.position
        });
    
        // Associate the styled map with the MapTypeId and set it to display
        map.mapTypes.set("styled_map", styledMapType);
        map.setMapTypeId("styled_map");

        // Get the modal component
        var modal = this.getComponent("modal");

        // Set the map object on the modal
        modal.setMap(map);

        // Attach a click listener to the Map to record new markers
        map.addListener("click", function(e) {
            // Determine the location at the click position
            var location = e.latLng;

            // Get the current lat/lng
            var lat = location.lat();
            var lng = location.lng();

            // Restrict lat/lng values to 6dp
            lat = lat.toFixed(4);
            lng = lng.toFixed(4);
            
            // Create lat/lng object
            latlngPosition = {lat: + lat, lng: + lng};

            // Show the modal
            modal.showModal(latlngPosition, true);
            
            // Add a marker at the position
            //AddMarker(latlngPosition, map);            
            
            // Create post data for the request
            var postData = { lat, lng, mapEntryId }

            // Create a new POST request
            xhr = new XMLHttpRequest();
            xhr.open("POST", "/mapentry");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function() {
                // Handle response - success/failure
            };
            xhr.send(JSON.stringify(postData));                        
        })

        // Map items
        var mapEntryItem;
        var mapEntryItems;
        
        // State variables
        var markers = this.state.markers;
        var mapEntryId = this.state.mapEntryId;

        // Lat/Lng position
        var latlngPosition;

        // Create HTTP request
        var xmlHttp = new XMLHttpRequest();

        // Get Map items from the database
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4) {
                // Parse the JSON response from the HTTP response
                mapEntryItems = JSON.parse(xmlHttp.responseText);

                // Loop through the Map items
                for (i = 0; i < mapEntryItems.length; i++) {
                    // Get the lat/lng position of the Map item
                    mapEntryItem = mapEntryItems[i];
                    latlngPosition = {lat: + mapEntryItem.lat, lng: + mapEntryItem.lng};

                    // Add a marker to indicate the Map item
                    AddMarker(latlngPosition, map);
                }
            }
        }

        // Execute the HTTP Request
        xmlHttp.open("GET", "/mapentries", true);
        xmlHttp.send(null);

        function AddMarker(latlngPosition, map) {
            // Marker icon
            var markerIcon = {
                url: "../../static/catch-pin.png",
                scaledSize: new google.maps.Size(40, 52),
                origin: new google.maps.Point(0,0),
                anchor: new google.maps.Point(20, 50)
            };

            // Create a marker and place it on the map
            var marker = new google.maps.Marker({
                position: latlngPosition,
                animation: google.maps.Animation.DROP,
                icon:markerIcon,
                map: map
            });
            
            // Add a click listener to the marker
            google.maps.event.addListener(marker, "click", function (e) {
                var lat = e.latLng.lat();
                var lng = e.latLng.lng();

                // Restrict lat/lng to 4dp precision
                lat = lat.toFixed(4);
                lng = lng.toFixed(4);

                // Show the modal
                modal.showModal(null, false);
                modal.updateModalText("Latitude: " + lat + "  Longitude: " + lng);
            });
        }
    },
};