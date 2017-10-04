// define globals
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var googleMap = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg"



$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!

  $.ajax({
	method: "GET",
	url: geoUrl,
	success: onSuccess,
	error: onError
});



function onSuccess(json) {
	 for (var i = 0; i < json.features.length; i++) {
	$("#info").append('<p>'+json.features[i].properties.title+'</p>');
	console.log(json)
}
}

function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}




});