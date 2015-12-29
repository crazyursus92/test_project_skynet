/**
 * Created by ursus on 29.12.2015.
 */
App.controller("MainCtrl",['$scope', '$http','$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    $scope.data = {};
    $http.get('/resource/data.json').success( function (data) {
        console.log(data);
        $scope.data = data;
        $rootScope.data = data;
        $location.uri = "/tariff";
    });

    $scope.rangePrice = function (price) {
        var arr = [];
        for (var i = 0; i < price.length; i++) {
             arr.push(+price[i].price);
        }
        return Math.min.apply(Math, arr) + " - " + Math.max.apply(Math, arr);
    };
    $scope.toTerm = function (id) {
        $location.url('tariff/'+id);
    };

}]);

