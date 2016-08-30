// Login controller
// =====================================================================================================================
(function () {

    var loginUser = function ($rootScope, $http, $state, authService, loaderService, toastService, userDataService, startupAppTime, localStorageService) {

        var vm = this;
        
        //startupAppTime Provider test
		console.log('App started at', startupAppTime.getAppStartupTime());
        
        // Add loader
        loaderService.addLoader();

        // Defaul user data is empty
        vm.user = {};

        // Check if login is set from reset password page
        if ($rootScope.login) {
            vm.user.email = $rootScope.login;
        }

        vm.submitLoginForm = function () {
            
	        loaderService.showLoader();

            authService.userLogin(vm.user)
                .then(function (res) {
                    if (res.data.success) {

						localStorageService.clearAll();

	                    userDataService.setUserData(res.data.user);
	                    userDataService.authorizeUser();



                        $state.go('viewProfile');
                        // loaderService.hideLoader();
                    } else {
                        loaderService.hideLoader();
                        // Show toast with error message
                        toastService.show(res.data.error.message);
                    }

                }).catch(function (err) {
                    
                    loaderService.hideLoader();
                    // Something wrong with serverside, show error toast
                    toastService.show(err.toString());
                });

        };

    };

    angular.module('app.auth').controller('loginCtrl', ['$rootScope', '$http', '$state', 'authService', 'loaderService', 'toastService', 'userDataService', 'startupAppTime', 'localStorageService',loginUser]);

})();