'use strict';

angular.module('tgdashboard.stockPrice', ['ngResource'])

.controller('StockPriceController', ['$scope', '$resource', function($scope, $resource) {

  var baseUrl = 'http://query.yahooapis.com/v1/public/yql';
  var symbol = 'JEC';
  var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

  var url = baseUrl + '?q=' + data + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  var resource = $resource(url, {callback: "JSON_CALLBACK"}, {getQuote: {method: "JSONP", isArray: false}});
      //http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2014-02-11" and endDate = "2014-02-18"&diagnostics=true&env=store://datatables.org/alltableswithkeys

  var historydata = encodeURIComponent("select * from yahoo.finance.historicaldata where symbol in ('" + symbol + "') and startDate = '2016-01-01' and endDate = '2016-07-21'");

  var historyurl = baseUrl + '?q=' + historydata + '&format=json&diagnostics=true&env=http://datatables.org/alltables.env';

  var historyresource = $resource(historyurl, {callback: "JSON_CALLBACK"}, {getQuote: {method: "JSONP", isArray: false}});
  //});

  resource.getQuote().$promise.then(
      function(data) {
          $scope.lastTradePriceOnly = data.query.results.quote.LastTradePriceOnly;
          $scope.historydata = data.query.results.quote.Close;
      },
      function(error) {
          // If something goes wrong with a JSONP request in AngularJS,
          // the status code is always reported as a "0". As such, it's
          // a bit of black-box, programmatically speaking.
          alert("Something went wrong!");
      }
  );
}]);
