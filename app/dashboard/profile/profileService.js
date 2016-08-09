// Profile Service
// =====================================================================================================================
(function () {

    var profileServiceFunc = function ($http) {

        // get user profile data
        this.getUserProfile = function (userLogin) {
            return $http({
                method: 'GET',
                url: '/api/users/' + userLogin
            })

        };

        // update user profile data
        this.updateUserProfile = function (userData) {
            return $http({
                method: 'PUT',
                url: 'api/users/' + userData.email,
                data: userData
            });
        };

        // check user session
        this.checkUserSession = function() {
            return $http({
                method: 'GET',
                url: '/api/checksession'
            });
        };

    };

    angular.module('app.profile').service('profileService', ['$http', profileServiceFunc]);

})();