// Main Dashboard Controller
// =====================================================================================================================
(function () {

    var dashboardCtrlFunc = function ($scope, $rootScope, userData, localStorageService) {



        // if we have session on serverside - pass data to local variables
        if (userData.success) {

            // update on localstorage
            localStorageService.set('loggedIn', true);
            localStorageService.set('user', angular.toJson(userData.user));

            // set locals
            this.loggedIn = localStorageService.get('loggedIn');
            this.user = angular.fromJson(localStorageService.get('user'));

        }

    };

    angular.module('app').controller('dashboardCtrl', ['$scope', '$rootScope', 'userData', 'localStorageService', dashboardCtrlFunc]);

})();