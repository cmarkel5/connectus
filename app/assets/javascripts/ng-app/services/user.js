angular.module('connectusApp')
.service('userService', ["$http", function($http) {

  var that = this;
  var usersUrl = '/users';

  that.users = [];

  this.getAllUsers = function() {
    return $http.get(usersUrl + '.json').success(function(data) {
      that.users = data;
    });
  };

}]);
