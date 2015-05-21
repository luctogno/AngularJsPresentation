/* jshint strict:false */
/* global angular */

var module = angular.module('PresentationModule', []);

module.controller('Controller', ['$scope', function($scope){
    'use strict';
    $scope.modello = '';
}]);

module.controller('shapeController', function($scope) {
    $scope.message = 'In shape controller';
    $scope.type = 'Shape';
});

module.controller('circleController', function($scope) {
    $scope.message = 'In circle controller';
});

module.controller('squareController', function($scope) {
    $scope.message = 'In square controller';
    $scope.type = 'Square';
});