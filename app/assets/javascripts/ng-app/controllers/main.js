

/**
 * @ngdoc function
 * @name connectusAngular2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the connectusAngular2App
 */

angular.module('connectusApp')
  .controller('MainCtrl', ['$scope', '$log', 'groupService', 'placesService', 'uiGmapGoogleMapApi',
              function ($scope, $log, groupService, placesService, uiGmapGoogleMapApi) {
    
    console.log('MainCtrl is alive!');



    // var midPointLat = (33.882147 + 33.773164)/2;
    // var midPointLong = (-84.521571 + -84.288918)/2;

    // $scope.map = {
    //   center: {
    //     latitude: midPointLat,
    //     longitude: midPointLong
    //   },
    //   zoom: 10
    // };

    uiGmapGoogleMapApi.then(function(/* maps */) {
      // can manipulate the map here.
    });

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
        /* alert(users.length)*/
      });
      //this function creates an array of just what you want.

      /*$scope.submitForm = function () {
        alert("send a request tonthe server: " + JSON.stringify(users));
       };*/
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


      // var midPointLat = (33.882147 + 33.773164)/2;
      // var midPointLong = (-84.521571 + -84.288918)/2;
     
      $scope.map = {
        center: {
          latitude: averageLatitude,
          longitude: averageLongitude
        },
        zoom: 10
      };
      $scope.searchbox = { template:'searchbox.tpl.html', position:'top-left'};

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

  
 

  }]);
