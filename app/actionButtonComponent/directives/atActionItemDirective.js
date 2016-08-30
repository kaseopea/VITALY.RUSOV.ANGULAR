// At Action Item Directive
// =====================================================================================================================
(function () {
    var atActionItemFunc = function () {
        return {
            restrict: 'E',
            scope: {
                ngModel : '=',
                callback: '=',
				errorCallback: '='
            },
            // bindToController: true,
            templateUrl: 'app/actionButtonComponent/tpl/atActionItem.tpl.html',
            controller: 'atActionItemCtrl as vm',
            transclude: true
        };
    };
    angular.module('atActionButton').directive('atActionItem', [atActionItemFunc]);
})();