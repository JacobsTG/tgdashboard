'use strict';

angular.module('tgdashboard.stockPrice', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/stockPrice', {
        templateUrl: 'stockPrice/stockPrice.html',
        controller: 'StockPriceController'
    });
}])

.controller('StockPriceController', ['$scope', '$resource', function($scope, $resource) {

  var url = 'http://query.yahooapis.com/v1/public/yql';
  var symbol = 'JEC';
  var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

  $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
      .done(function (data) {
          var quote = data.query.results.quote;
          $scope.lastTradePriceOnly = quote.LastTradePriceOnly;
          console.log('Gathered the stock quote');
          console.log(quote);
          console.log(quote.LastTradePriceOnly);
          console.log($scope.lastTradePriceOnly);
          // data.query.results.quote.LastTradePriceOnly);
      })
      .fail(function (jqxhr, textStatus, error) {
          var err = textStatus + ", " + error;
          console.log('Request failed: ' + err);
      });
}]);

/*
function getData() {
    var url = 'http://query.yahooapis.com/v1/public/yql';
    var symbol = $("#symbol").val();
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
            $('#result').text("Price: " + data.query.results.quote.LastTradePriceOnly);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log('Request failed: ' + err);
        });
}
*/
/*
appModule.controller('StockQuote', ['$scope', 'getData',
function($scope, getData) {
    var api = getData.getStockQuote($scope.ticker_name);
    var data = api.get({symbol:$scope.ticker_name}, function() {
        var quote = data.query.results.quote;
        $scope.lang = data.query.lang;
        $scope.lastTradeDate = quote.LastTradeDate;
        $scope.lastTradeTime = quote.LastTradeTime;
        $scope.lastTradePriceOnly = quote.LastTradePriceOnly;
    });
}]);
*/
