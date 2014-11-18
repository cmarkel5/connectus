$(function(){
  var mapOptions, canvas, map;

  mapOptions = { 
    zoom:       13,
    center:     new google.maps.LatLng(33.8277101, -84.4051704), // Center -- this is what will change with users (ng-click)
    mapTypeId:  google.maps.MapTypeId.ROADMAP
  };
  canvas = document.getElementById("googleMap");
  map = new google.maps.Map(canvas, mapOptions);

  $("#current_position").on("click", function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation,handleLocationError);
      navigator.geolocation.watchPosition(updateLocation,handleLocationError);
    } else{
      alert("Oops! This browser does not support HTML5 Geolocation");
    }
  });


  function updateLocation(position){
    var coords = position.coords;
    var latlng = new google.maps.LatLng(coords.latitude,coords.longitude);
    var markerBounds = new google.maps.LatLngBounds();
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: 'You are here'
    });
    map.setCenter(latlng);
    map.setZoom(17);
  }

  function handleLocationError(error){
    console.log(error);
  }

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

  var input = document.getElementById('autocomplete');
  var autocomplete = new google.maps.places.Autocomplete(input);


  autocomplete.bindTo('bounds', map);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setIcon({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    });
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = (place.address_components[0] && place.address_components[0].short_name || '');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  $("#directions_form").on("submit", function(){
    from = $("#directions_from").val();
    to = $("#directions_to").val();
    mode = $("#directions_mode").val();
    var request = {
      origin:       from,
      destination:  to,
      travelMode:   google.maps.TravelMode[mode]
    };

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        $("#directions-panel").html();
        directionsDisplay.setPanel(document.getElementById('directions-panel'));

      } else {
        alert("something went wrong!");
      }
    });        
    return false;
  });
});


https://maps.googleapis.com/maps/api/place/search/json?keyword=coffee&location=37.787930,-122.4074990&radius=5000&key=AIzaSyCJh6kHPa5K2u_7u3WZR4Df883_08BOfLc