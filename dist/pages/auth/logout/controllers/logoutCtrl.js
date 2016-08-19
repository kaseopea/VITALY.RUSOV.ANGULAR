'use strict';

// Logout controller
// =====================================================================================================================
(function () {

    var logoutUser = function logoutUser($http, $state, localStorageService, authService, toastService) {

        authService.userLogout().then(function (res) {
            if (res.data.success) {

                //successfully deleted session
                //delete local user info
                localStorageService.remove('loggedIn');
                localStorageService.remove('user');

                $state.go('login');
            } else {
                toastService.show(res.data.error.message);
            }
        });
    };

    angular.module('app').controller('logoutCtrl', ['$http', '$state', 'localStorageService', 'authService', 'toastService', logoutUser]);
})();