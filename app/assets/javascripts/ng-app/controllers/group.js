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

  };

  $scope.getPlaces = function() {
    placesService.getAllPlaces($scope.midPoint).success(function(data) {
      $scope.placesHash = data;
    }).error(function() {
      alert('Something went wrong!');
    });
  };


  // var placesResults = $scope.placesHash;
  
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


// var placesHash = {
//   html_attributions: [ ],
//   next_page_token: "CsQCMwEAAALfKuVkNKie1uy7uwiK5PobgKqQjfjaUiluhHBqmIoFmMTCtBgqyZVLCNDz6Uc1d_dLyeCAFOY-dx5aUaRM5P0M08jUQs_S1qaif07QyzH0CGfWNkbcrOdIrnJ5FdenvrBNRhRQPBoVir7nctqzChvEj7vSvgzEZrMjjis0x8mW2fjNxrxweyeTvMvMfRvor3uDPHxB2peTS4OoWPERdZ08OVLLgF22F7EEziJsii3im_T5ij3S1Io9b8BrH_T_hJ5E4X1oamGMpY0QhzZmioLFhixdQ3q0rb_N4eItuaCkhr6tzrVHAmum1cmX-Zu-uhq0aDa6_DiApFsALW5cqyvOEjKv-vWtrGsuWK_x8EcAmqApJZc7aG8cZLnzlbiY7tu5kxR2Vlhj0eX9dfv-mG_t_fF2BY9EJPZGo-XFHYpHEhBzOKhHTIKEmU9xrG1l_ou_GhSdVfrZcNpF7KD-s4YPInZWEQ17Gw",
//   results: [
//     {
//       geometry: {
//         location: {
//           lat: 33.771487,
//           lng: -84.367369
//         }
//       },
//       icon: "http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
//       id: "0e7fe93bee004fe549cf9c7b7e1a8a693d5c3e0e",
//       name: "Dancing Goats",
//       opening_hours: {
//         open_now: true,
//         weekay_text: [ ]
//       },
//       photos: [
//         {
//           height: 949,
//           html_attributions: [
//             '<a href="https://plus.google.com/111141462231324321018">Alex Fite-Wassilak</a>'
//           ],
//           photo_reference: "CnRoAAAAMHfqxY16zxJ0Qq42W_8oxJdDdgEfNR9OFRjnaDLdldY8ldO9-GZMy3FtjP3aAySF_G7_gLoS5DPtcqm62O_GjVDV7ZXWFcR3A66w8eSh9xmITXHzyRzSMfjLs03m2pm-C6te4YDhde4xM54LtrKkwxIQbOR-QhMgG7jrHqyjSSRbfhoUFuock8NAIioV5hG0j-uOVGCX33s",
//           width: 1265
//         }
//       ],
//       place_id: "ChIJH-mNkxAE9YgRifsZaSiEdD8",
//       rating: 4.5,
//       reference: "CnRvAAAA3zkKHYP3ajAAZ4suazoak_dDeQZYkfhJDHw6Xfmb5hAQajAx5EjaoNO92CBW2QU6_7TejfAywxpK21oJ4BWQNTXBYlT85zS5jt678f9AnoYM-gD4k3nkjihm2g7kmtFSWjUmawIrDjnkRiMNTgYYEBIQ1njtR9FIYxPom1BlqkuJPRoUF6pK1RHa29EziqMJ2LbNXZwejbQ",
//       scope: "GOOGLE",
//       types: [
//         "cafe",
//         "food",
//         "establishment"
//       ],
//       vicinity: "650 North Avenue NE, Atlanta"
//     },
//     {
//       geometry: {
//         location: {
//           lat: 33.852629,
//           lng: -84.38131
//         }
//       },
//       icon: "http://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
//       id: "e80fe399aae29c94ad8dc5ad90d9498c9c118c8c",
//       name: "Wingate by Wyndham Atlanta/Buckhead",
//       opening_hours: {
//         open_now: true,
//         weekday_text: [ ]
//       },
//       photos: [
//         {
//           height: 478,
//           html_attributions: [ ],
//           photo_reference: "CnRnAAAAQ7tuWFkDU45PyOLJ_aviGgu5svDSmTmtLQJw934udZYHU9839ppKwuzwWCkkOgYCblsalC2vOIj3tWlzGa-epMz8Od-tkBSX3csAsVie8YxNwo8BLfxbFHg8SakgX2pK6adOKR1zuIDnpYf145JbZRIQT59GE3StrhkLobdROvHoeRoUMMWxYXKErQlRhXH5eOZ1YzhT9Gs",
//           width: 660
//         }
//       ],
//       place_id: "ChIJsV2m92MP9YgRzhrg2TudrGk",
//       rating: 4.6,
//       reference: "CpQBhQAAAFdNL8EPip6fGk7bifZnwCSm9IO403tCdqfyvih4NVB2F0e6BJ_OM1hdnWe_vlvlYmJRULVRWBV7tWQAATgrqWt2JqRsFMuJqxvNloR8SnPJxJsSrE2MTh7Fu2wBOcJA8kMy-CvKUHt-h7xaV3DHMVXNWVD_0XnSbOtIm3NGZqsdFDygzHAU_TQGSqBo_SMOKBIQr2KHYKli2DcMUT3sqJB5SxoU_XgluVV4lkcf58KiD5sgTskJjPQ",
//       scope: "GOOGLE",
//       types: [
//         "night_club",
//         "bar",
//         "lodging",
//         "establishment"
//       ],
//       vicinity: "3600 Piedmont Rd NE, Atlanta"
//     }
//   ],
//   status: "OK"
// };