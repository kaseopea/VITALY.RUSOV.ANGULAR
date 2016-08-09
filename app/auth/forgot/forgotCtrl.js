// Forgot password controller
// =====================================================================================================================

(function () {
    var forgotCtrlFunc = function ($scope, $rootScope, authService, $state, toastService) {
        var vm = this;

        //setting login if previously defined
        if ($rootScope.login !== 'undefined') {
            vm.login = $rootScope.login;
        }

        vm.submitForgotForm = function () {
            authService.resetPassword(vm.login).then(function (res) {

                if (res.data.success) {

                    // saving login for login page
                    $rootScope.login = vm.login;

                    $state.go('login');

                    toastService.show(res.data.message);

                } else {
                    // Show toast with error message
                    toastService.show(res.error.message);
                }
            });
        };
    };

    angular.module('app.auth').controller('forgotCtrl', ['$scope', '$rootScope', 'authService', '$state', 'toastService', forgotCtrlFunc]);


})();