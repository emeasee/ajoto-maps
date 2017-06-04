
// This will let you use the .remove() function later on
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates
  });
}

function createPopUpManufacturers(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
      '<h4>' + currentFeature.properties.description + '</h4>')
    .addTo(map);
}

function createPopUpStockists(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
      '<h4>' + currentFeature.properties.address + '</h4>' +
      '<h4>' + currentFeature.properties.contact + '</h4>')
    .addTo(map);
}

// Add an event listener for when a user clicks on the map
map.on('click', function(e) {
  // Query all the rendered points in the view
  if(stockists){
    var features = map.queryRenderedFeatures(e.point, { layers: ['stockists'] });
    if (features.length) {
      var clickedPoint = features[0];
      // 1. Fly to the point
      flyToStore(clickedPoint);
      // 2. Close all other popups and display popup for clicked store
      createPopUpStockists(clickedPoint);
    }
  } else {
    var features = map.queryRenderedFeatures(e.point, { layers: ['manufacturers-industrial'] });
    if (features.length) {
      var clickedPoint = features[0];
      // 1. Fly to the point
      flyToStore(clickedPoint);
      // 2. Close all other popups and display popup for clicked store
      createPopUpManufacturers(clickedPoint);
    }
  }
});

map.addControl(new mapboxgl.NavigationControl());
map.scrollZoom.disable();