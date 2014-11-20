angular.module('connectusApp')
    .controller('HomeCtrl',
                ['$scope',
                function ($scope) {
        console.log('HomeCtrl is alive!');
        $scope.things = ['Angular', 'Rails 4.1', 'UI Router', 'Together!!'];
    }]);