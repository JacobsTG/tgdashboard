'use strict';

// Declare app level module which depends on views, and components
angular.module('tgdashboard', [
  'ngRoute',
  'tgdashboard.view1',
  'tgdashboard.weather',
  'tgdashboard.stockPrice',
  'tgdashboard.version'
]).

config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
