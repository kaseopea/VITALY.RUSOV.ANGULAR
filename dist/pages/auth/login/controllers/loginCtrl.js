'use strict';

// Login controller
// =====================================================================================================================


(function () {

    var loginUser = function loginUser($rootScope, $http, $state, localStorageService, authService, toastService) {

        var vm = this;

        // Defaul user data is empty
        vm.user = {};

        // Check if login is set from reset password page
        if ($rootScope.login !== 'undefined') {
            vm.user.email = $rootScope.login;
        }

        vm.submitLoginForm = function () {

            authService.userLogin(vm.user).then(function (res) {

                if (res.data.success) {
                    // setting user to localStorage
                    localStorageService.set('loggedIn', true);
                    localStorageService.set('user', angular.toJson(res.data.user));

                    // go to profile state
                    $state.go('viewProfile');
                } else {
                    // Show toast with error message
                    toastService.show(res.data.error.message);
                }
            }).catch(function (err) {
                console.log(err);
                // Something wrong with serverside, show error toast
                toastService.show(err.toString());
            });
        };
    };

    angular.module('app.auth').controller('loginCtrl', ['$rootScope', '$http', '$state', 'localStorageService', 'authService', 'toastService', loginUser]);
})();