angular.module("connectusApp")
.controller("MainCtrl", 
            ['$scope', '$log', 'userService', 'placesService','textService', 'uiGmapGoogleMapApi', 
            function ($scope, $log, userService, placesService, textService, uiGmapGoogleMapApi) {

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
    $scope.users = _.filter(users, function(user) {
      return user.selected === true;
    });
    return $scope.users;
  };

  $scope.setLengthOfUsers = function() {
    $scope.length = $scope.users.length;
  };

  $scope.getAverageLatitude = function() {
    var sumLatitude = _.reduce( $scope.users, function( memory, user) {
    return memory + user.latitude;
    }, 0 );
    
    $scope.averageLatitude = sumLatitude/$scope.length;
  };  

  $scope.getAverageLongitude = function() {
    var sumLongitude = _.reduce( $scope.users, function( memory, user) {
      return memory + user.longitude;
    }, 0 );
    
    $scope.averageLongitude = sumLongitude/$scope.length;
  };

  $scope.getMidPoint = function() {
    $scope.setLengthOfUsers();
    $scope.getAverageLatitude();
    $scope.getAverageLongitude();
    $scope.midPoint = {
      latitude: $scope.averageLatitude,
      longitude: $scope.averageLongitude
    };
  };
  
  $scope.setMap = function() {
    $scope.map = {
      center: {
        latitude: $scope.averageLatitude,
        longitude: $scope.averageLongitude
      },
      zoom: 11
    };

    var main_color = '#2d313f',
    saturation_value= -20,
    brightness_value= 5;

    //we define here the style of the map
    var style = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": 10
            },
            {
                "lightness": 30
            },
            {
                "gamma": 0.5
            },
            {
                "hue": "#435158"
            }
        ]
      }];
        
     $scope.options = {
        scrollwheel: false,
        styles: style
      };
  
  };

  $scope.setMidPointMarker = function() {
    $scope.midPointMarker = [
      { id: 0,
        coords: {
          latitude: $scope.averageLatitude,
          longitude: $scope.averageLongitude
        },
        icon: { url:"http://www.clker.com/cliparts/c/I/g/P/d/h/google-maps-pin-blue-th.png",
                scaledSize: {
                  height: 40,
                  width: 40
                }
              },
        name: "Midpoint"
      }
    ];
  };

  $scope.setUsersMarkers = function() {
    $scope.markerList =  $scope.users;
  };

  $scope.showMap = function() {
    $scope.setMap();
    $scope.setMidPointMarker();
    $scope.setUsersMarkers();
  };

  $scope.getPlaces = function() {
    placesService.getAllPlaces($scope.averageLatitude, $scope.averageLongitude).success(function(data) {
      $scope.placesHash = data;
    }).error(function() {
      alert('Something went wrong!');
    });
  };
  $scope.setPlaceMarker = function() {
    var coords = $scope.selectedPlace.coords.hash;
    var id = $scope.selectedPlace.id;
    var name = $scope.selectedPlace.name;
    
    $scope.selectedPlaceMarker = [
      {
        id: id,
        name: name,
        coords: coords,
        icon: { url:"http://www.clker.com/cliparts/r/J/F/7/y/4/placemark-th.png",
                scaledSize: {
                  height: 40,
                  width: 40
                }
              },
    }];
    console.log($scope.selectedPlaceMarker.coords);
  };

  $scope.selectPlace = function(place) {
    $scope.selectedPlace = place;
    $scope.setPlaceMarker();
  };

  $scope.clearSelectedPlace = function() {
    $scope.selectedPlace = null;
  };

  $scope.showPlaces = function() {
    $scope.selectedUsers();
    $scope.getMidPoint();
    $scope.getPlaces();
    $scope.showMap();
  };

  $scope.textAddress = function(place, address) {
    textService.textUsers($scope.users, place, address).success(function() {
      alert('Successfully texted group!');
    }).error(function() {
      alert('Something went wrong!');
    });
  };
  
}]);