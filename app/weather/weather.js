'use strict';

angular.module('tgdashboard.weather', ['ngResource'])

/* TODO: Currently, this controller gets called twice since it's being used in
 * both the forecast and current conditions components.  Need to figure out a
 * way to make one API call for weather to be used in both views.
*/
.controller('WeatherController', ['$scope', '$resource', '$interval', function($scope, $resource, $interval) {
  var apiKey = '35f0e4b226c891aba95107313f68443d';
  var lati = 35.394320;
  var longi = -86.184506;
  var url = 'https://api.forecast.io/forecast/' + apiKey + '/' + lati + ',' + longi;

  // Angular.js $resource service instance for calling the Forcase.io API
  var resource = $resource(url, {
    callback: "JSON_CALLBACK"
  }, {
    getWeather: {
      method: "JSONP",
      isArray: false
    }
  });

  // Loads weather variables to $scope
  this.loadWeather = function()
  {
    console.log(Date.now() + " - Getting updated weather data");
    resource.getWeather().$promise.then(
      function(weather) {
        $scope.weather = weather;
        var rainIntensity = [];
        var minuteCount = [];
        $.each(weather.minutely.data, function(i, data){rainIntensity.push(data.precipIntensity); minuteCount.push(i);});
        $scope.rainIntensity = rainIntensity;
        $scope.minuteCount = minuteCount;

        var rainProbability = [];
        $.each(weather.minutely.data, function(i,data){rainProbability.push(data.precipProbability*100);});
        $scope.rainProbability = rainProbability;
      },
      function(error) {
        // If something goes wrong with a JSONP request in AngularJS,
        // the status code is always reported as a "0". As such, it's
        // a bit of black-box, programmatically speaking.
        alert("Something went wrong!");
      }
    );
  }

  // Set up a refresh interval of 5 minutes
  var refreshInterval = $interval(function() {
    this.loadWeather();
  }.bind(this), 300000);

  // Unregister from the interval service
  $scope.$on('$destroy', function() {
    $interval.cancel(refreshInterval);
  })

  // Perform initial load of weather data
  this.loadWeather();

  // Returns the weather icon class corresponding to the specified weather condition
  $scope.getIconClass = function(icon) {
    var iconClass = "icon icon-lg wi ";

    switch (icon) {
      case 'day-sunny':
      case 'clear-day':
      iconClass += "wi-forecast-io-clear-day";
      break;
      case 'night-clear':
      case 'clear-night':
      iconClass += "wi-forecast-io-clear-night";
      break;
      case 'rain':
      iconClass += "wi-forecast-io-rain";
      break;
      case 'snow':
      iconClass += "wi-forecast-io-snow";
      break;
      case 'sleet':
      iconClass += "wi-forecast-io-sleet";
      break;
      case 'strong-wind':
      iconClass += "wi-forecast-io-wind";
      break;
      case 'fog':
      iconClass += "wi-forecast-io-fog";
      break;
      case 'cloudy':
      iconClass += "wi-forecast-io-cloudy";
      break;
      case 'day-cloudy':
      case 'partly-cloudy-day':
      iconClass += "wi-forecast-io-partly-cloudy-day";
      break;
      case 'night-cloudy':
      case 'partly-cloudy-night':
      iconClass += "wi-forecast-io-partly-cloudy-night";
      break;
      case 'hail':
      iconClass += "wi-forecast-io-hail";
      break;
      case 'thunderstorm':
      iconClass += "wi-forecast-io-thunderstorm";
      break;
      case 'tornado':
      iconClass += "wi-forecast-io-tornado";
      break;
      default:
      iconClass += "wi-na";
      break;
    }

    return iconClass;
  };
}]);
