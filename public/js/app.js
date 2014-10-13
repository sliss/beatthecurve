var btcApp = angular.module('btcApp', [

]);

btcApp.controller('HomeController', ['$scope', function($scope) {
  console.log('home controller');
}]);
/*
townBookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/town-list.html',
        controller: 'HomeController'
      }).
      when('/towns/:townSlug', {
        templateUrl: 'partials/town-detail.html',
        controller: 'TownDetailCtrl'          
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  */