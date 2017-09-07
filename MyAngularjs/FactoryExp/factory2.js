/**
 * Created by devendra.kumar on 14-04-2016.
 */
var myApp1 = angular.module('MainApp1', []);

myApp1.controller('controller1', function($scope, imageService) {
    $scope.images = imageService.images;
    //then access it in the view with images.list
    imageService.getImages(101);
})

myApp1.controller('controller2', function($scope, imageService) {
        $scope.images = imageService.images;
        //then access it in the view with images.list
        imageService.getImages(202);
    })





myApp1.factory("imageService", function($http) {
    var service = {};
    service.images = {};
    service.images.list = [];
    service.getImages = function(userId) {
        window.localStorage['user_id'] = userId;
        return $http({
            method: "get",
            url: "http://example.com/images",
            params: { user: userId }
        }).success(function(data){
            service.images.list = data
        });
    }

    //at the initialization of the service, you launch the getImages once with the localStorage value.
    service.getImages(window.localStorage['user_id']);

    return service;
});
