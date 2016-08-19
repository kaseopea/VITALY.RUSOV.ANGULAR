// Action Button controller
// =====================================================================================================================
(function () {

    var atActionButtonCtrlFunc = function (scope, element, attrs) {
        var vm = this;

        // Actions Menu Open/Close Flag
        vm.showActionsMenu = false;

        // Open/Close Function
        vm.showActions = function () {
            vm.showActionsMenu = vm.showActionsMenu ? false : true;
        };

    };

    angular.module('atActionButton').controller('atActionButtonCtrl', ['$scope', '$element', '$attrs', atActionButtonCtrlFunc]);

})();