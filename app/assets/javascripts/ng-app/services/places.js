angular.module('connectusApp')
.service('placesService', ["$http", function($http) {

  var that = this;
  var placesUrl = '/places';

  that.places = [];

  this.getAllPlaces = function(midPoint) {
    return $http.get(placesUrl + '.json', { params: { location: midPoint }});
      
   
  };

}]);




