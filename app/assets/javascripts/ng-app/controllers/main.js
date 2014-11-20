'use strict';

/**
 * @ngdoc function
 * @name connectusAngular2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the connectusAngular2App
 */
angular.module('connectusApp')
  .controller('MainCtrl', ['$scope', 'uiGmapGoogleMapApi',
              function ($scope, uiGmapGoogleMapApi) {
    
    console.log('MainCtrl is alive!');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var midPointLat = (33.882147 + 33.773164)/2;
    var midPointLong = (-84.521571 + -84.288918)/2;

    $scope.map = {
      center: {
        latitude: midPointLat,
        longitude: midPointLong
      },
      zoom: 10
    };

    uiGmapGoogleMapApi.then(function(/* maps */) {
      // can manipulate the map here.
    });

  $scope.markerList = [
    // {
    //   id: 0,
    //   coords: {
    //     latitude: 33.771527,
    //     longitude: -84.367367
    //   },
    //   message: 'General Assembly'
    // },
    {
      id: 1,
      coords: {
        latitude: 33.882147,
        longitude: -84.521571
      },
      message: 'Chris Markel'
      // icon:"https://en.gravatar.com/userimage/74172252/39d87c7514bfdc6e8bcf4d7b8fc35472.jpg"
    },
    {
      id: 2,
      coords: {
        latitude: 33.773164,
        longitude: -84.288918
      },
      message:'Amanda Raymond'
    }
  ]

  }]);
