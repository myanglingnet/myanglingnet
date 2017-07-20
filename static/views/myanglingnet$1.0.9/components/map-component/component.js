$_mod.def("/myanglingnet$1.0.9/components/map-component/component", function(require, exports, module, __filename, __dirname) { module.exports = class {
    onMount() {
        var position = {lat: -25.363, lng: 131.044};

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
            {name: 'Styled Map'}
        )
        
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: position
        });
        
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

        
        map.addListener('click', function() {
            addMarker();
        });

        function addMarker() {
            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: 'Click to zoom'
            });
        }
    }
}
});