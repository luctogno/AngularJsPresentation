/* jshint strict:false */
/* global angular */

angular.module('PresentationModule', [])
    .controller('Controller', ['$scope', function ($scope) {
    'use strict';
    $scope.modello = '';
}])
    .controller('shapeController', function ($scope) {
    $scope.message = 'In shape controller';
    $scope.type = 'Shape';
})
    .controller('circleController', function ($scope) {
    $scope.message = 'In circle controller';
})
    .controller('squareController', function ($scope) {
    $scope.message = 'In square controller';
    $scope.type = 'Square';
})
    .directive('digitalClock', [
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
    }])
    .controller('theController', function ($scope) {
    $scope.colors = [
        { color: 'blue', name: 'BLU', showOther: true },
        { color: 'red', name: 'ROSSO', showOther: true },
        { color: 'yellow', name: 'GIALLO', showOther: false },
        { color: 'orange', name: 'ARANCIO', showOther: false },
        { color: 'purple', name: 'VIOLA', showOther: false },
        { color: 'green', name: 'VERDE', showOther: true }
    ];

    $scope.changeColor = function (elem) {
        $scope.bgColor = elem.color;
        $scope.showOther = elem.showOther;
    };
});

angular.element(document).ready(function () {
    setTimeout(function(){
		angular.bootstrap(document, ['PresentationModule']);
	}, 2000);
});
