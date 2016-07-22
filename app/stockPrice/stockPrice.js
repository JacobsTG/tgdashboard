'use strict';

angular.module('tgdashboard.stockPrice', ['ngResource'])

.controller('StockPriceController', ['$scope', '$resource', function($scope, $resource) {

  var baseUrl = 'http://query.yahooapis.com/v1/public/yql';
  var symbol = 'JEC';

  // Set up the request address and query string
  var queryString = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
  var url = baseUrl + '?q=' + queryString + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  // Set up a request using the $resource service
  var currentPriceResource = $resource(url, {
    callback: "JSON_CALLBACK"
  }, {
    getQuote: {
      method: "JSONP",
      isArray: false
    }
  });

  // Make the request for the current price
  currentPriceResource.getQuote().$promise.then(
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

  //http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2014-02-11" and endDate = "2014-02-18"&diagnostics=true&env=store://datatables.org/alltableswithkeys

  // Set up the request address and query string
  queryString = encodeURIComponent("select * from yahoo.finance.historicaldata where symbol in ('" + symbol + "') and startDate = '2016-01-01' and endDate = '2016-07-21'");
  var historyurl = baseUrl + '?q=' + queryString + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  // Set up a request using the $resource service
  var historyresource = $resource(historyurl, {
    callback: "JSON_CALLBACK"
  }, {
    getHistory: {
      method: "JSONP",
      isArray: false
    }
  });

  // Make the request for the price history
  historyresource.getHistory().$promise.then(
    function(data) {
      $scope.priceHistory = data.query.results.quote;
    },
    function(error) {
      // If something goes wrong with a JSONP request in AngularJS,
      // the status code is always reported as a "0". As such, it's
      // a bit of black-box, programmatically speaking.
      alert("Something went wrong!");
    }
  );

}]);
