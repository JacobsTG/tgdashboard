'use strict';

angular.module('tgdashboard.stockPrice', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/stockPrice', {
        templateUrl: 'stockPrice/stockPrice.html',
        controller: 'StockPriceController'
    });
}])

.controller('StockPriceController', ['$scope', '$resource', function($scope, $resource) {

  var baseUrl = 'http://query.yahooapis.com/v1/public/yql';
  var symbol = 'JEC';
  var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

  var url = baseUrl + '?q=' + data + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  var resource = $resource(url, {
      callback: "JSON_CALLBACK"
  }, {
      getQuote: {
          method: "JSONP",
          isArray: false
      }
  });

  resource.getQuote().$promise.then(
      function(data) {
          $scope.lastTradePriceOnly = data.query.results.quote.LastTradePriceOnly;
      },
      function(error) {
          // If something goes wrong with a JSONP request in AngularJS,
          // the status code is always reported as a "0". As such, it's
          // a bit of black-box, programmatically speaking.
          alert("Something went wrong!");
      }
  );
}]);
