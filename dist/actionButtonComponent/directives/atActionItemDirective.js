'use strict';

// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function atActionItemFunc() {
        return {
            restrict: 'E',
            scope: {
                ngModel: '='
            },
            templateUrl: 'app/actionButtonComponent/tpl/atActionItem.tpl.html',
            controller: 'atActionItemCtrl as vm',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();