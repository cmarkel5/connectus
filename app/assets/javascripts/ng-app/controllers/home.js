angular.module('connectusApp')
    .controller('HomeCtrl', function ($scope) {
        console.log('HomeCtrl is alive!');
        $scope.things = ['Angular', 'Rails 4.1', 'UI Router', 'Together!!'];
    });