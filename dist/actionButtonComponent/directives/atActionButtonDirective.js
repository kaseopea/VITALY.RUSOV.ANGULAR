'use strict';

// At Action Button Directive
// =====================================================================================================================
(function () {
    var atActionButtonDirective = function atActionButtonDirective() {
        return {
            restrict: 'E',
            scope: {
                buttonTitle: '@buttonTitle'
            },
            controller: 'atActionButtonCtrl as vm',
            templateUrl: 'app/actionButtonComponent/tpl/atActionButton.tpl.html',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionButton', [atActionButtonDirective]);
})();