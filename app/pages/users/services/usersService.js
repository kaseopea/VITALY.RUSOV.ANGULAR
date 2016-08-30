// Users Service
// =====================================================================================================================
(function () {

    var usersServiceFunc = function ($http) {

        return {
            // Get Single User
            getUser: function (login) {
                return $http({
                    method: 'GET',
                    url: '/api/users/' + login,
                    data: login
                });
            },

            // Get All Users
            getAllUsers: function () {
                return $http({
                    method: 'GET',
                    url: '/api/userslist'
                });
            },

            // Create User
            createUser: function (data) {
                return $http({
                    method: 'POST',
                    url: 'api/createUser',
                    data: data
                });
            },

            // Update User Information
            updateUser: function (user) {
                return $http({
                    method: 'PUT',
                    url: 'api/users/' + user.email,
                    data: user
                });
            },

            // Delete User
            deleteUser: function (login) {
                return $http({
                    method: 'DELETE',
                    url: 'api/users/' + login,
                    data: login
                });
            }
        };

    };

    angular.module('app.users').factory('usersService', ['$http', usersServiceFunc]);

})();