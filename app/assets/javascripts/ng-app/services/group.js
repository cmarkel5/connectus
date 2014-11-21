angular.module('connectusApp')
.service('groupService', ["$http", function($http) {

  var that = this;
  var usersUrl = '/users';

  that.users = [];

  this.getAllUsers = function() {
    return $http.get(usersUrl + '.json').success(function(data) {
      that.users = data;
    });
  };

  // this.add = function(stall) {
  //   return $http.post(usersUrl + '.json', { stall : stall }).success(function(data) {
  //     that.users.push(data);
  //   });
  // };

  // this.update = function(stall) {
  //   return $http.put(usersUrl + '/' + stall.id + '.json', { stall: stall });
  // };

  // this.delete = function(stall) {
  //   return $http.delete(usersUrl + '/' + stall.id + '.json').success(function(data) {
  //     // getAll();
  //     that.users.splice(that.users.indexOf(stall), 1);
  //   });
  // };

}]);
