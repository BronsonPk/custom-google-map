function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.8650289582911, lng: 2.3221745766147484 },
        zoom: 15,
    });

    // Load the KML file
    const kmlLayer = new google.maps.KmlLayer({
        url: "path/to/your/kml/file.kml",
        map: map,
    });
}

window.initMap = initMap;
