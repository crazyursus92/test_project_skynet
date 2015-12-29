/**
 * Created by ursus on 29.12.2015.
 */
App.controller("OrderCtrl",['$scope', '$http','TermHelper', '$rootScope','$routeParams',"$location", function ($scope, $http, TermHelper, $rootScope, $routeParams, $location) {
    $scope.tariff = $rootScope.data.tarifs[$routeParams.term];
    $scope.helper = TermHelper;
    for (var i = 0; i < $scope.tariff.tarifs.length; i++) {
        if(+$scope.tariff.tarifs[i].ID === +$routeParams.order){
            $scope.term = $scope.tariff.tarifs[i];
            break;
        }

    }
    $scope.toTariff = function () {
        $location.url("tariff/"+$routeParams.term);
    };
}]);