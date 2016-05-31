'use strict';

angular.module('tgdashboard.weather', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weather', {
        templateUrl: 'weather/weather.html',
        controller: 'WeatherController'
    });
}])

.controller('WeatherController', ['$scope', '$resource', function($scope, $resource) {
    var apiKey = 'REPLACE ME WITH THE REAL API KEY!';
    var lati = 35.394320;
    var longi = -86.184506;
    var url = 'https://api.forecast.io/forecast/' + apiKey + '/' + lati + ',' + longi;

    var resource = $resource(url, {
        callback: "JSON_CALLBACK"
    }, {
        getWeather: {
            method: "JSONP",
            isArray: false
        }
    });

    resource.getWeather().$promise.then(
        function(weather) {
            $scope.weather = weather;
        },
        function(error) {
            // If something goes wrong with a JSONP request in AngularJS,
            // the status code is always reported as a "0". As such, it's
            // a bit of black-box, programmatically speaking.
            alert("Something went wrong!");
        }
    );

    $scope.getIconClass = function(icon) {
        var iconClass = "icon wi ";
        console.log('icon = ' + icon);

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
