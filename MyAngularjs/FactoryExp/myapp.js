/**
 * Created by devendra.kumar on 14-04-2016.
 */
var app = angular.module('app', []);

app.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});
app.controller('OneController', function ($scope, Scopes) {

    Scopes.store('OneController', $scope);

    $scope.variable1 = "One";

    $scope.buttonClick = function () {
        console.log("OneController");
        console.log("OneController::variable1", Scopes.get('OneController').variable1);
        console.log("TwoController::variable1", Scopes.get('TwoController').variable1);
        console.log("$scope::variable1", $scope.variable1);
    };

    $scope.buttonClickOnTwoController = function () {
        Scopes.get('TwoController').buttonClick();
    };
});
app.controller('TwoController', function ($scope, Scopes) {

    Scopes.store('TwoController', $scope);

    $scope.variable1 = "Two";

    $scope.buttonClick = function () {
        console.log("TwoController");
        console.log("OneController::variable1", Scopes.get('OneController').variable1);
        console.log("TwoController::variable1", Scopes.get('TwoController').variable1);
        console.log("$scope::variable1", $scope.variable1);
    };

    $scope.buttonClickOnOneController = function () {
        Scopes.get('OneController').buttonClick();
    };
});
app.factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});
