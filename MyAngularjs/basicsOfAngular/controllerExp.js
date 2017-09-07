/**
 * Created by devendra.kumar on 16-02-2016.
 */
angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.names = [
        {name:'Devenadra Kumar',country:'India'},
        {name:'Hege',country:'Sweden'},
        {name:'Saniya',country:'Denmark'}
    ];
});