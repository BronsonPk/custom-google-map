function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.8650289582911, lng: 2.3221745766147484 },
        zoom: 15,
    });

    // Load the GeoJSON file
    fetch("custom_map.geojson")
        .then(response => response.json())
        .then(data => {
            // Create a GeoJSON data layer and add it to the map
            const geojsonLayer = new google.maps.Data();
            geojsonLayer.addGeoJson(data);
            geojsonLayer.setMap(map);

            // Customize the style of the GeoJSON features
            geojsonLayer.setStyle(feature => {
                const icon = feature.getProperty("icon");
                return {
                    icon: icon,
                    strokeColor: feature.getProperty("stroke"),
                    strokeWeight: feature.getProperty("stroke-width"),
                    strokeOpacity: feature.getProperty("stroke-opacity"),
                    fillColor: feature.getProperty("fill"),
                    fillOpacity: feature.getProperty("fill-opacity")
                };
            });

            // Fit the map bounds to the GeoJSON layer
            const bounds = new google.maps.LatLngBounds();
            geojsonLayer.forEach(feature => {
                if (feature.getGeometry().getType() === "Point") {
                    bounds.extend(feature.getGeometry().get());
                } else {
                    feature.getGeometry().getArray().forEach(path => {
                        path.getArray().forEach(coord => {
                            bounds.extend(coord);
                        });
                    });
                }
            });
            map.fitBounds(bounds);
        })
        .catch(error => {
            console.error("Error loading GeoJSON file:", error);
        });
}
