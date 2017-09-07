angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.names = [
        {name:'Ramkumar',country:'Norway'},
        {name:'Harish',country:'Sweden'},
        {name:'Bhuvnesh',country:'Denmark'}
    ];
});
