class PlacesController < ActionController::Base

  # GET /places
  # GET /places.json
  def search_places
    # coordinates = params[:coordinates] || { latitude: 33.771112, longitude: -84.367090 }
    latitude = params[:latitude]
    longitude = params[:longitude]
    coordinates = { latitude: latitude, longitude: longitude }
    params = { term: 'free wifi' }
    places = Yelp.client.search_by_coordinates(coordinates, params)
    @places = places.businesses

  end
  # add the ruby version of the filter below to the api call...
  #   $scope.filterPlaces = function() {
  # //move this filter to rails side in places controller
  #   $scope.places = _.filter($scope.placesHash, function(place) {
  #     return !_.contains(place.types, "lodging");
  #   });
  # };
end







