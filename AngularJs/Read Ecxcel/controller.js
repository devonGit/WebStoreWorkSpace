'use strict';

angular.module('App').controller('PreviewController', function($scope, XLSXReaderService) {
    $scope.showPreview = false;

    $scope.fileChanged = function(files) {
        $scope.sheets = [];
        $scope.excelFile = files[0];
        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview).then(function(xlsxData) {
            $scope.sheets = xlsxData.sheets;
        });
    };

    $scope.showPreviewChanged = function() {
        if ($scope.showPreview) {
            XLSXReaderService.readFile($scope.excelFile, $scope.showPreview).then(function(xlsxData) {
                $scope.sheets = xlsxData.sheets;
            });
        };
    };
});