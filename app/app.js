'use strict';

// Declare app level module which depends on views, and components
angular.module('tgdashboard', [
  'ui.router',
  'tgdashboard.weather',
  'tgdashboard.stockPrice',
  'tgdashboard.picture',
  'tgdashboard.version'
]).

config(function($stateProvider) {

  $stateProvider
  .state('app', {
    url: "",
    views: {
      "top-left": {
        templateUrl: "weather/forecast.html",
        controller: "WeatherController"
      },
      "top-right": {
        templateUrl: "weather/current.html",
        controller: "WeatherController"
      },
      "bottom-left": {
        templateUrl: "stockPrice/stockPrice.html",
        controller: "StockPriceController"
      },
      "bottom-right": {
        templateUrl: "picture/picture.html",
        controller: "PictureController"
       }
    }
  })
});
