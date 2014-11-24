class PlacesController < ActionController::Base

  # GET /places
  # GET /places.json
  def search_places
    # coordinates = params[:coordinates] || { latitude: 33.771112, longitude: -84.367090 }
    coordinates = params[:latitude], params[:longitude]
    params = { term: 'free wifi' } 
    binding.pry
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

  this.getAllPlaces = function(lat, long) {
    return $http.get(placesUrl + '.json', { 
                                            params: { 
                                              coordinates: {
                                                latitude: lat,
                                                longitude: long
                                              }
                                            }
                                          });  
  };

}]);






