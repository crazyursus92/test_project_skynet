/**
 * Created by ursus on 29.12.2015.
 */
function declension(num, expressions) {
    var result;
    var count = num % 100;
    if (count >= 5 && count <= 20) {
        result = expressions['2'];
    } else {
        count = count % 10;
        if (count == 1) {
            result = expressions['0'];
        } else if (count >= 2 && count <= 4) {
            result = expressions['1'];
        } else {
            result = expressions['2'];
        }
    }
    return result;
}





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
/**
 * Created by ursus on 29.12.2015.
 */
App.service('TermHelper', function () {
    this.getMonth = function (count) {
        return count + " " + declension(count, ['месяц', 'месяца', 'месяцев']);
    };
    this.priceToMoth = function (tariff) {
        return Math.ceil(tariff.price/tariff.pay_period);
    };
    this.discount = function (tariff, tarifs) {
        var basePrice = 0;
        for (var i = 0; i < tarifs.length; i++) {
            if(+tarifs[i].pay_period === 1){
                basePrice = +tarifs[i].price;
                break;
            }
        }
        return Math.ceil( basePrice * tariff.pay_period  - tariff.price );
    };
    this.endWork = function (pay_period) {
        console.log(pay_period);
        var date = new Date();
        var month = +date.getMonth()+(+pay_period);
        console.log(month);
        date.setMonth(month);
        var day = date.getDate();
        day = day < 9 ? '0' + day : day;
        month = date.getMonth() + 1;
        month = month < 9 ? '0' + month : month;
        var year = date.getFullYear();
        return day + '.' + month + '.' + year;
    };
});


/**
 * Created by ursus on 29.12.2015.
 */
App.controller("TariffCtrl",['$scope', '$http', function ($scope, $http) {

}]);
/**
 * Created by ursus on 29.12.2015.
 */
App.controller("TariffListCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {


}]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHBlci5qcyIsIm1haW4uanMiLCJNYWluQ3RybC5qcyIsIk9yZGVyQ3RybC5qcyIsIlNlcnZpZXMuanMiLCJUYXJpZmZDdG5ybC5qcyIsIlRhcmlmZkxpc3RDdG5ybC5qcyIsIlRlcm1DdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVyc3VzIG9uIDI5LjEyLjIwMTUuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNsZW5zaW9uKG51bSwgZXhwcmVzc2lvbnMpIHtcclxuICAgIHZhciByZXN1bHQ7XHJcbiAgICB2YXIgY291bnQgPSBudW0gJSAxMDA7XHJcbiAgICBpZiAoY291bnQgPj0gNSAmJiBjb3VudCA8PSAyMCkge1xyXG4gICAgICAgIHJlc3VsdCA9IGV4cHJlc3Npb25zWycyJ107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvdW50ID0gY291bnQgJSAxMDtcclxuICAgICAgICBpZiAoY291bnQgPT0gMSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBleHByZXNzaW9uc1snMCddO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY291bnQgPj0gMiAmJiBjb3VudCA8PSA0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGV4cHJlc3Npb25zWycxJ107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gZXhwcmVzc2lvbnNbJzInXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuXHJcbiIsIlxyXG52YXIgQXBwID0gYW5ndWxhci5tb2R1bGUoXCJUZXN0QXBwXCIsWyAnbmdSb3V0ZSddKTtcclxuXHJcbkFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXIuXHJcblxyXG4gICAgICAgIHdoZW4oJy90YXJpZmYvOnRlcm0vOm9yZGVyJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlL29yZGVyLmh0bWwnXHJcbiAgICAgICAgfSkuXHJcbiAgICAgICAgd2hlbignL3RhcmlmZi86dGVybScsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS90ZXJtLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVGVybUN0cmwnXHJcbiAgICAgICAgfSkuXHJcbiAgICAgICAgd2hlbignL3RhcmlmZicsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS90YXJpZmYuaHRtbCdcclxuICAgICAgICB9KS5cclxuICAgICAgICBvdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnL3RhcmlmZidcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSB1cnN1cyBvbiAyOS4xMi4yMDE1LlxyXG4gKi9cclxuQXBwLmNvbnRyb2xsZXIoXCJNYWluQ3RybFwiLFsnJHNjb3BlJywgJyRodHRwJywnJGxvY2F0aW9uJywgJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAkc2NvcGUuZGF0YSA9IHt9O1xyXG4gICAgJGh0dHAuZ2V0KCcvcmVzb3VyY2UvZGF0YS5qc29uJykuc3VjY2VzcyggZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAkc2NvcGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgJHJvb3RTY29wZS5kYXRhID0gZGF0YTtcclxuICAgICAgICAkbG9jYXRpb24udXJpID0gXCIvdGFyaWZmXCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkc2NvcGUucmFuZ2VQcmljZSA9IGZ1bmN0aW9uIChwcmljZSkge1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByaWNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICBhcnIucHVzaCgrcHJpY2VbaV0ucHJpY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5taW4uYXBwbHkoTWF0aCwgYXJyKSArIFwiIC0gXCIgKyBNYXRoLm1heC5hcHBseShNYXRoLCBhcnIpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS50b1Rlcm0gPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAkbG9jYXRpb24udXJsKCd0YXJpZmYvJytpZCk7XHJcbiAgICB9O1xyXG5cclxufV0pO1xyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXJzdXMgb24gMjkuMTIuMjAxNS5cclxuICovXHJcbkFwcC5jb250cm9sbGVyKFwiT3JkZXJDdHJsXCIsWyckc2NvcGUnLCAnJGh0dHAnLCdUZXJtSGVscGVyJywgJyRyb290U2NvcGUnLCckcm91dGVQYXJhbXMnLFwiJGxvY2F0aW9uXCIsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCBUZXJtSGVscGVyLCAkcm9vdFNjb3BlLCAkcm91dGVQYXJhbXMsICRsb2NhdGlvbikge1xyXG4gICAgJHNjb3BlLnRhcmlmZiA9ICRyb290U2NvcGUuZGF0YS50YXJpZnNbJHJvdXRlUGFyYW1zLnRlcm1dO1xyXG4gICAgJHNjb3BlLmhlbHBlciA9IFRlcm1IZWxwZXI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS50YXJpZmYudGFyaWZzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYoKyRzY29wZS50YXJpZmYudGFyaWZzW2ldLklEID09PSArJHJvdXRlUGFyYW1zLm9yZGVyKXtcclxuICAgICAgICAgICAgJHNjb3BlLnRlcm0gPSAkc2NvcGUudGFyaWZmLnRhcmlmc1tpXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgICRzY29wZS50b1RhcmlmZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkbG9jYXRpb24udXJsKFwidGFyaWZmL1wiKyRyb3V0ZVBhcmFtcy50ZXJtKTtcclxuICAgIH07XHJcbn1dKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSB1cnN1cyBvbiAyOS4xMi4yMDE1LlxyXG4gKi9cclxuQXBwLnNlcnZpY2UoJ1Rlcm1IZWxwZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdldE1vbnRoID0gZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50ICsgXCIgXCIgKyBkZWNsZW5zaW9uKGNvdW50LCBbJ9C80LXRgdGP0YYnLCAn0LzQtdGB0Y/RhtCwJywgJ9C80LXRgdGP0YbQtdCyJ10pO1xyXG4gICAgfTtcclxuICAgIHRoaXMucHJpY2VUb01vdGggPSBmdW5jdGlvbiAodGFyaWZmKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0YXJpZmYucHJpY2UvdGFyaWZmLnBheV9wZXJpb2QpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZGlzY291bnQgPSBmdW5jdGlvbiAodGFyaWZmLCB0YXJpZnMpIHtcclxuICAgICAgICB2YXIgYmFzZVByaWNlID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmlmcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZigrdGFyaWZzW2ldLnBheV9wZXJpb2QgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgYmFzZVByaWNlID0gK3Rhcmlmc1tpXS5wcmljZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoIGJhc2VQcmljZSAqIHRhcmlmZi5wYXlfcGVyaW9kICAtIHRhcmlmZi5wcmljZSApO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZW5kV29yayA9IGZ1bmN0aW9uIChwYXlfcGVyaW9kKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGF5X3BlcmlvZCk7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBtb250aCA9ICtkYXRlLmdldE1vbnRoKCkrKCtwYXlfcGVyaW9kKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb250aCk7XHJcbiAgICAgICAgZGF0ZS5zZXRNb250aChtb250aCk7XHJcbiAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGRheSA9IGRheSA8IDkgPyAnMCcgKyBkYXkgOiBkYXk7XHJcbiAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIG1vbnRoID0gbW9udGggPCA5ID8gJzAnICsgbW9udGggOiBtb250aDtcclxuICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICByZXR1cm4gZGF5ICsgJy4nICsgbW9udGggKyAnLicgKyB5ZWFyO1xyXG4gICAgfTtcclxufSk7XHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSB1cnN1cyBvbiAyOS4xMi4yMDE1LlxyXG4gKi9cclxuQXBwLmNvbnRyb2xsZXIoXCJUYXJpZmZDdHJsXCIsWyckc2NvcGUnLCAnJGh0dHAnLCBmdW5jdGlvbiAoJHNjb3BlLCAkaHR0cCkge1xyXG5cclxufV0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVyc3VzIG9uIDI5LjEyLjIwMTUuXHJcbiAqL1xyXG5BcHAuY29udHJvbGxlcihcIlRhcmlmZkxpc3RDdHJsXCIsIFsnJHNjb3BlJywgJyRodHRwJywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uICgkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcclxuXHJcblxyXG59XSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXJzdXMgb24gMjkuMTIuMjAxNS5cclxuICovXHJcbkFwcC5jb250cm9sbGVyKFwiVGVybUN0cmxcIixbJyRzY29wZScsICckbG9jYXRpb24nLCAnJHJvb3RTY29wZScsICckcm91dGVQYXJhbXMnLCdUZXJtSGVscGVyJyxcclxuICAgIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgJHJvb3RTY29wZSwgJHJvdXRlUGFyYW1zLCBUZXJtSGVscGVyKSB7XHJcbiAgICAkc2NvcGUuZGF0YSA9ICRyb290U2NvcGUuZGF0YTtcclxuICAgICRzY29wZS50ZXJtX2lkID0gJHJvdXRlUGFyYW1zLnRlcm07XHJcbiAgICAkc2NvcGUudGFyaWZmID0gJHJvb3RTY29wZS5kYXRhLnRhcmlmc1skcm91dGVQYXJhbXMudGVybV07XHJcbiAgICAkc2NvcGUuaGVscGVyID0gVGVybUhlbHBlcjtcclxuICAgICRzY29wZS50b09yZGVyID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXJpZmYvXCIgKyAkcm91dGVQYXJhbXMudGVybSArIFwiL1wiICsgaWQpO1xyXG4gICAgICAgICRsb2NhdGlvbi51cmwoXCJ0YXJpZmYvXCIrJHJvdXRlUGFyYW1zLnRlcm0rXCIvXCIraWQpO1xyXG4gICAgfTtcclxuICAgICRzY29wZS50b1RhcmlmZnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJGxvY2F0aW9uLnVybChcInRhcmlmZi9cIik7XHJcbiAgICB9O1xyXG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
