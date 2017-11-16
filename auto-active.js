(function (angular) {
    var app = angular.module('auto-active',[]);
    app.directive('autoActive',['$location',function ($location) {
        return{
            link:function (scope,element,attributes) {
                //给每个标签添加点击事件
                element.on('click',function () {
                    //清除其他兄弟元素的样式
                    element.parent().children().removeClass('active')
                    //给当前元素添加样式
                    element.addClass('active')
                })

                //$watch监视锚点值变化添加样式
                //获取锚点值$location.url()
                scope.loca=$location
                scope.$watch('loca.url()',function (now,old) {
                    //获取a标签href属性值   attr()返回指定属性的属性值
                    var hash=element.find('a').attr('href').substr(1)
                    if(now.startsWith(hash)){
                        //清除其他兄弟元素的样式
                        element.parent().children().removeClass('active')
                        //给当前元素添加样式
                        element.addClass('active')
                    }
                })
            }
        }
    }])
})(angular)