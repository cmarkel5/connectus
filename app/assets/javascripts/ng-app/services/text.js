angular.module('connectusApp')
.service('textService', ["$http", function($http) {

  var that = this;
  var textUrl = '/texts';

  this.textUsers = function(users, place, address) {
    var users = new Array(users);
    params = { users: users, place: place, address: address };
    return $http.get(textUrl + '.json', { params: params });
  };

}]);