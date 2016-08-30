// Auth Service
// =====================================================================================================================
(function () {

    var authServiceFunc = function ($http) {

        // user login
        this.userLogin = function (userData) {
            return $http({
                method: 'POST',
                url: '/login',
                data: userData
            });
        };

        // reset password
        this.resetPassword = function (login) {
            return $http({
	            method: 'GET',
	            url: '/forgot',
                params: {
	                user: login
                }
            });
        };

        // user logout
        this.userLogout = function() {
            return $http({
                method: 'GET',
                url: '/logout'
            });
        };

        //check if user has access
        this.checkUserAccess = function (userRole, accessRoles) {
	        var access = (accessRoles) ? accessRoles.findIndex((role) => (role === userRole)) : 0;
	        return access >= 0;

        };
    };

    angular.module('app.auth').service('authService', ['$http', authServiceFunc]);

})();