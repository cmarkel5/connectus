angular.module("connectusApp")
.controller("GroupCtrl", ['$scope', 'groupService', 'placesService', function ($scope, groupService, placesService) {

   $scope.getUsers = function() {
    groupService.getAllUsers().success(function(data) {
      $scope.userList = data;
    }).error(function() {
      alert('Something went wrong!');
    });
  };

  $scope.getUsers();
    
   
  $scope.selectedUsers = function() {
    //this line resets the userList so you can update correctly
    var users = $scope.userList;
    //this line filter out for users that were selected upon a submit click
    users = _.filter(users, function(user) {
      return user.selected === true;
    });
    
    var length = users.length;
   
    var sumLatitude = _.reduce( users, function( memory, user) {
      return memory + user.latitude;
    }, 0 );
    
    var averageLatitude = sumLatitude/length;
  
    var sumLongitude = _.reduce( users, function( memory, user) {
      return memory + user.longitude;
    }, 0 );
    
    var averageLongitude = sumLongitude/length;

    $scope.midPoint = averageLatitude + "," + averageLongitude;

    $scope.getPlaces();

  };

  $scope.getPlaces = function() {
    placesService.getAllPlaces($scope.midPoint).success(function(data) {
      $scope.placesHash = data;
    }).error(function() {
      alert('Something went wrong!');
    });
  };

  
  //move this filter to rails side in places controller
  $scope.places = _.filter($scope.placesHash, function(place) {
      return place.opening_hours.open_now === true && !_.contains(place.types, "lodging");
  });

  $scope.selectPlace = function(place) {
    $scope.selectedPlace = place;
  };

  $scope.clearSelectedPlace = function() {
    $scope.selectedPlace = null;
  };

  $scope.textAddress = function(address) {
    account_sid = "ACd2ddae5650ca06720b7a7ba52f6a04d4"
    auth_token = "1d2ced219c26754a5bd66f297aa45945"
    client = Twilio::REST::Client.new account_sid, auth_token
    from = "+17702855442" # My Twilio number
      client.account.messages.create(
        :from => from,
        :to => self.phone,
        :body => address )
  };
  
}]);


