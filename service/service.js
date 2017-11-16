(function (angular) {
    var app = angular.module('service',[]);
    app.service('myService',['$window',function ($window) {
        this.jsonp=function (url,arg,fn) {
            var spt = $window.document.createElement('script');
            //设置src属性
            //拼接url及arg
            //http://api.douban.com/v2/movie/in_theaters?start=xxx&count=xxx&callback=xxx
            var querystring=''
            for(var key in arg){
                querystring+=key+'='+arg[key]+'&'
            }

            var funcName='myJsonp'+$window.Math.random().toString().substr(2);
            url+='?'+querystring+'callback='+funcName
            $window[funcName]=function (data) {
                fn(data)
            }
            spt.src=url
            //添加script到dom中
            $window.document.body.appendChild(spt)
        }
    }])
})(angular)