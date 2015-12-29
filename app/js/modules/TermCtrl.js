/**
 * Created by ursus on 29.12.2015.
 */
App.controller("TermCtrl",['$scope', '$location', '$rootScope', '$routeParams','TermHelper',
    function ($scope, $location, $rootScope, $routeParams, TermHelper) {
    $scope.data = $rootScope.data;
    $scope.term_id = $routeParams.term;
    $scope.tariff = $rootScope.data.tarifs[$routeParams.term];
    $scope.helper = TermHelper;
    $scope.toOrder = function (id) {
        console.log("tariff/" + $routeParams.term + "/" + id);
        $location.url("tariff/"+$routeParams.term+"/"+id);
    };
    $scope.toTariffs = function () {
        $location.url("tariff/");
    };
}]);