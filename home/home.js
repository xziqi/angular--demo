(function (angular) {
    var app = angular.module('home',['ngRoute'])

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/home_page',{
            templateUrl:'home/home.html'
        })
    }])
})(angular)