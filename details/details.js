(function (angular) {
    var app = angular.module('details',['ngRoute','service']);
    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/details/:id',{
            templateUrl:'./details/details.html',
            controller:'detailsController'
        })
    }])
    
    app.controller('detailsController',['$scope','myService','$routeParams',function ($scope,myService,$routeParams) {
        myService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function (data) {
            $scope.data=data
            $scope.$apply()
        })
    }])
})(angular)