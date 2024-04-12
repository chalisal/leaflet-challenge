// Creating the map object
let myMap = L.map("map", {
    center: [27.96044, -82.30695],
    zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get the data with d3.
d3.json(geoData).then(function (data) {
    console.log(data);

    function chooseColor(x) {
        switch (true) {
            case x > 90:
                return "red";
            case x > 70:
                return "orangered";
            case x > 50:
                return "orange";
            case x > 30:
                return "yellow";
            case x > 10:
                return "yellowgreen";
            default:
                return "green";
        }
    }




    L.geoJson(data, {
        pointToLayer: function (feature, latLong) {
            return L.circleMarker(latLong);
        },
        style: function (feature) {
            return {
                color: "black",
                weight: 0.25,
                radius: feature.properties.mag * 4,
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                fillOpacity: 1
            }
        },
 
    // This is called on each feature.
        onEachFeature: function (feature, layer) {

      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.geometry.coordinates + "</h2>");

    }
  }).addTo(myMap);





    // legend, use low number -90, 4 lines of code
    /*Legend specific*/
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: #98ee00"></i><span>-10-10</span><br>';
        div.innerHTML += '<i style="background: #d4ee00"></i><span>10-30</span><br>';
        div.innerHTML += '<i style="background: #eecc00"></i><span>30-50</span><br>';
        div.innerHTML += '<i style="background: #ee9c00"></i><span>50-70</span><br>';
        div.innerHTML += '<i style="background: #ea822c"></i><span>70-90</span><br>';
        div.innerHTML += '<i style="background: #ea2c2c"></i><span>90+</span><br>';




        return div;
    };

    legend.addTo(myMap);






});

