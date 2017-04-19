// define globals
var endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// wait until the document is loaded
$(document).on("ready", function() {
// Displays map on page centered on SF
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44 },
      zoom: 1
  });

  var quakeTemplateHtml = $('#quakes-template').html();
  var quakeInfo = $("#info"); // assign jQuery selector to variable
  var quakeTemplate = Handlebars.compile(quakeTemplateHtml);
  // CODE IN HERE!
  $.get(endpoint, function(data) {
    // map quakeData
    var quakeData = data.features.map(function(quake) {
// Drops pins
            var coords = quake.geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
// Returns earthquake info
    var shortTitle = quake.properties.title;
      return {
        title: shortTitle.slice(),
        long: quake.geometry.coordinates[0],
        lat: quake.geometry.coordinates[1],
        time: Math.round((Date.now()-quake.properties.time)/360000)
      };
    });
// pass quakedata into template
    var quakesHtml = quakeTemplate({ quakes: quakeData });
// render template to the page
    quakeInfo.append(quakesHtml);
  });

});
