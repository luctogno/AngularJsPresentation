/* jshint strict:false */
/* global angular */

var module = angular.module('PresentationModule', []);

module.controller('myController', function ($scope) {
    $scope.variable = 'Hello World!';
});

module.controller('Controller', ['$scope', function ($scope) {
    'use strict';
    $scope.modello = '';
}]);

module.controller('shapeController', function ($scope) {
    $scope.message = 'In shape controller';
    $scope.type = 'Shape';
});

module.controller('circleController', function ($scope) {
    $scope.message = 'In circle controller';
});

module.controller('squareController', function ($scope) {
    $scope.message = 'In square controller';
    $scope.type = 'Square';
});

module.directive('digitalClock', [
    '$interval',
    '$filter',
    function ($interval, $filter) {

        return {
            restrict: 'EA',
            template: '-> {{time}} <-',
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {

                scope.format = attrs.format || 'HH:mm:ss';
                
                $interval(function(){
                      scope.time = $filter('date')(new Date(), scope.format);
                }, 1000);
                // ogni secondo esegue la funzione
            }
        };
    }]);