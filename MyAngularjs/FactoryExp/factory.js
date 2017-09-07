/**
 * Created by devendra.kumar on 14-04-2016.
 */
/*TML   JS  Result
Edit on*/
var mainMod = angular.module('MainApp', []);
mainMod.controller('MainCtrl', ['$scope','dataShare',
    function ($scope,dataShare) {
        $scope.text = 'Devendra';
        /*$scope.send = function(){
            dataShare.sendData($scope.text);
        };*/

        $scope.send=function(text){
            dataShare.sendData(text);
        }

    }
]);
mainMod.controller('MainCtrl2', ['$scope','dataShare',
    function ($scope,dataShare) {

        $scope.text = '';
        $scope.$on('data_shared',function(){
            var text =  dataShare.getData();
            $scope.text = text;
        });
    }
]);
mainMod.factory('dataShare',function($rootScope){
    var service = {};
    service.data = false;
    service.sendData = function(data){
        this.data = data;
        $rootScope.$broadcast('data_shared');
    };
    service.getData = function(){
        return this.data;
    };
    return service;
});
