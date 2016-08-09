// View Profile Controller
// =====================================================================================================================
(function () {

    var profileCtrlFunc = function ($scope, $rootScope, $state) {

        var vm = this;

        // setting current tab
        vm.currentNavItem = $state.current.name;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            vm.currentNavItem = toState.name;
        });

    };


    angular.module('app.profile').controller('profileCtrl', ['$scope', '$rootScope', '$state', profileCtrlFunc]);

})();