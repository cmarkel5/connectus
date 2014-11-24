angular.module("connectusApp")
.controller("MainCtrl", ['$scope', '$log', 'userService', 'placesService','textService', 'uiGmapGoogleMapApi', function ($scope, $log, userService, placesService, textService, uiGmapGoogleMapApi) {

  uiGmapGoogleMapApi.then(function(/* maps */) {
      // can manipulate the map here.
    });

  $scope.getUsers = function() {
    userService.getAllUsers().success(function(data) {
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
    console.log(users);
    return users;
  };
    
  $scope.showPlaces = function() {
    var users = $scope.selectedUsers();
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

    $scope.map = {
        center: {
          latitude: averageLatitude,
          longitude: averageLongitude
        },
        zoom: 10
      };

      $scope.midPointMarker = [
        { id: 0,
         coords: {
            latitude: averageLatitude,
            longitude: averageLongitude
          },
          icon: { url:"http://www.clker.com/cliparts/c/I/g/P/d/h/google-maps-pin-blue-th.png",
                  scaledSize: {height: 40,
                         width: 40
                        }
                },
          name: "Midpoint"
        }];

      $scope.getAllMarkers = function() {
        $scope.markerList = users;
      };
      $scope.getAllMarkers();
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

  $scope.textAddress = function(place, address) {
    var users = $scope.selectedUsers();

    textService.textUsers(users, place, address).success(function() {
      alert('Successfully texted group!');
    }).error(function() {
      alert('Something went wrong!');
    });
  };
  
}]);