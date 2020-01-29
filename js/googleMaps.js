var map;
// Valores por defecto (Facultad ORT)
var latitudeSelected = -34.903684600180995;
var longitudeSelected = -56.190686551854014;
var mapaClickeado = false;

function initMap() {
  // Create the map with no initial style specified.
  // It therefore has default styling.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitudeSelected,
      lng: longitudeSelected
    },
    zoom: 14,
    mapTypeControl: false
  });

  // Listener para obtener la latitud y longitud seleccionada en el mapa
  google.maps.event.addListener(map, "click", function (event) {
    latitudeSelected = event.latLng.lat();
    longitudeSelected = event.latLng.lng();
    console.log('Se seleccionó la latitud: ' + latitudeSelected + ', y longitud: ' + longitudeSelected);

    radius = new google.maps.Circle({map: map,
        radius: 100,
        center: event.latLng,
        fillColor: '#777',
        fillOpacity: 0.1,
        strokeColor: '#AA0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        draggable: true,    // Dragable
        editable: true      // Resizable
    });

    // Center of map
    map.panTo(new google.maps.LatLng(latitudeSelected,longitudeSelected));
    mapaClickeado = true;
  });
}