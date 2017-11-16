(function (angular) {
    var app = angular.module('movie_list',['ngRoute','service'])

    app.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/:movieType/:page?',{
            templateUrl:'movie_list/movie_list.html',
            controller:'movie_listController'
        })
    }])

    app.controller('movie_listController',[
        '$scope',
        '$http',
        'myService',
        '$routeParams',
        '$route',
        function ($scope,$http,myService,$routeParams,$route) {
            console.log($routeParams);
            //默认显示loading动画
            $scope.loading=true
            $scope.pageSzie=5  //每页显示多少条数据
            $scope.page=($routeParams.page||'1')-0 //第几页  字符串变数字
            var pageStart=($scope.page-1)*$scope.pageSzie  //从第几条开始
            myService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType,{start:pageStart,count:$scope.pageSzie,q:$routeParams.q},function (data) {
                $scope.data=data
                $scope.totalPage=Math.ceil($scope.data.total/$scope.pageSzie)  //总页数

                //获取数据后隐藏loading动画
                $scope.loading=false
                $scope.$apply()
            })

            //获取指定页数据  
            //nowPage是我想要的页数
            $scope.getPage=function (nowPage) {
                if(nowPage>$scope.totalPage ||nowPage<=0){
                    return
                }
                $route.updateParams({page:nowPage})//改变url中锚点的参数部分
            }
            // $http.get('./movie_list/data.json').then(function (res) {
            //     $scope.data=res.data
            // })
    }])
})(angular)