module.exports = {
    onInput() {
        this.state = {
            map: null,
            latlngPosition: null
        }
    },
    
    // Show the modal       
    showModal(latlngPosition) { 
        var modal = this.getEl("modal-window");
        modal.style.display = "block";

        // Set the lat/lng of the map marker
        this.state.latlngPosition = latlngPosition;
    },

    // Hide the modal
    hideModal() {
        var modal = this.getEl("modal-window");
        modal.style.display = "none";
    },
    
    // Update modal text
    updateModalText(text) {
        var modalText = this.getEl("modal-text");
        modalText.innerHTML = text;
    },
    
    // Link the map to the modal
    setMap(map) {
        this.state.map = map;
    },
    
    // Add a marker to the map
    addMapMarker() {
        // Hide the modal
        this.hideModal();

        // Marker icon
        var markerIcon = {
            url: "../../static/catch-pin.png",
            scaledSize: new google.maps.Size(40, 52),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(20, 50)
        };

        // Create a marker and place it on the map
        var marker = new google.maps.Marker({
            position: this.state.latlngPosition,
            animation: google.maps.Animation.DROP,
            icon:markerIcon,
            map: this.state.map
        });
        
        // Add a click listener to the marker
        google.maps.event.addListener(marker, "click", function (e) {
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();

            // Restrict lat/lng to 4dp precision
            lat = lat.toFixed(4);
            lng = lng.toFixed(4);

            // Show the modal
            var modal = document.getElementsByClassName("modal")[0];
            modal.style.display = "block";

            var modalText = document.getElementsByClassName("modal-text")[0];
            modalText.innerHTML = "lat: " + lat + "; lng: " + lng;
        });
    }
}