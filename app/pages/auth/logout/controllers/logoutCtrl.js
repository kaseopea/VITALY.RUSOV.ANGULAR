// Logout controller
// =====================================================================================================================
(function () {

    var logoutUser = function ($http, $state, authService, toastService, loaderService, userDataService, startupAppTime) {

        //Loader
        loaderService.addLoader();
	    loaderService.showLoader();

        authService.userLogout().then(function (res) {
            if (res.data.success) {

	            // Clearing Local User Data
	            userDataService.clearUserData();

	            // Clear Startup App Time
	            startupAppTime.clearAppStartupTime();
	            
                loaderService.hideLoader();
                $state.go('login');
            } else {
                toastService.show(res.data.error.message);
            }
        });

    };

    angular.module('app').controller('logoutCtrl', ['$http', '$state', 'authService', 'toastService', 'loaderService', 'userDataService', 'startupAppTime', logoutUser]);

})();