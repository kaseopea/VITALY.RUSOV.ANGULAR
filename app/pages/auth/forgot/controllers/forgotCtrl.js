// Forgot password controller
// =====================================================================================================================

(function () {
    var forgotCtrlFunc = function ($scope, $rootScope, authService, $state, toastService, loaderService) {
        var vm = this;
		loaderService.addLoader();

        //setting login if previously defined
        if ($rootScope.login) {
            vm.login = $rootScope.login;
        }

        vm.submitForgotForm = function () {
			loaderService.showLoader();
			authService.resetPassword(vm.login).then(function (res) {
                if (res.data.success) {
                    // saving login for login page
                    $rootScope.login = vm.login;
                    $state.go('login');
                    toastService.show(res.data.password);
					loaderService.hideLoader();
                } else {
                    // Show toast with error message
                    toastService.show(res.data.error.message);
					loaderService.hideLoader();
                }
            });
        };
    };

    angular.module('app.auth').controller('forgotCtrl', ['$scope', '$rootScope', 'authService', '$state', 'toastService', 'loaderService', forgotCtrlFunc]);


})();