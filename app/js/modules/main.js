
var App = angular.module("TestApp",[ 'ngRoute']);

App.config(function ($routeProvider) {
        $routeProvider.

        when('/tariff/:term/:order', {
            templateUrl: 'template/order.html'
        }).
        when('/tariff/:term', {
            templateUrl: 'template/term.html',
            controller: 'TermCtrl'
        }).
        when('/tariff', {
            templateUrl: 'template/tariff.html'
        }).
        otherwise({
            redirectTo: '/tariff'
        });
    }
);