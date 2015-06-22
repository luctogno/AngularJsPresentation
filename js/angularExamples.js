/* jshint strict:false */
/* global angular */

var module = angular.module('PresentationModule', []);

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

                $interval(function () {
                    scope.time = $filter('date')(new Date(), scope.format);
                }, 1000);
                // ogni secondo esegue la funzione
            }
        };
    }]);

module.controller('theController', function ($scope) {
    $scope.colors = [
        { color: 'blue', name: 'BLU', showOther : true},
        { color: 'red', name: 'ROSSO', showOther : true },
        { color: 'yellow', name: 'GIALLO', showOther : false },
        { color: 'orange', name: 'ARANCIO', showOther : false },
        { color: 'purple', name: 'VIOLA', showOther : false },
        { color: 'green', name: 'VERDE', showOther : true }
    ];

    $scope.changeColor = function (elem) {
        $scope.bgColor = elem.color;
        $scope.showOther = elem.showOther;
    };
});