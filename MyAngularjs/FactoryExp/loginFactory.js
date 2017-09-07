/**
 * Created by devendra.kumar on 14-04-2016.
 */
var mainMod = angular.module('MainApp', []);
//login controller

mainMod.controller('Login', ['$scope','dataShare',
$scope.login = function(){
    var ajax = $http.post('127.0.0.1/login:5000',{user:'test',pass:'test'});
    ajax.then(function(data){
        //login success
        dataShare.sendData(data);
        $location.path('/dashboard');
    });
}
]);

//dashboard controller
mainMod.controller('Login', ['$scope','dataShare',
$scope.$on('data_shared',function(){
    var data = dataShare.getData();
})
]);

mainMod.factory('dataShare',function($rootScope,$timeout){
    var service = {};
    service.data = false;
    service.sendData = function(data){
        this.data = data;
        $timeout(function(){
            $rootScope.$broadcast('data_shared');
        },100);
    };
    service.getData = function(){
        return this.data;
    };
    return service;
});
