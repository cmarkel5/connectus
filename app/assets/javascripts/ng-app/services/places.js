angular.module('connectusApp')
.service('placesService', ["$http", function($http) {

  var that = this;
  var placesUrl = '/places';

  that.places = [];

  this.getAllPlaces = function(latitude, longitude) {
    params = { latitude: latitude, longitude: longitude };
    return $http.get(placesUrl + '.json', { params: params });
  };

}]);



