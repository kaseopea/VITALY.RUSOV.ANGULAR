// User Data Service
// =====================================================================================================================
(function () {

    var userDataFunc = function (CONST, $translate, localStorageService) {
        var self = this;

        self._user = null;
        self._authorized = false;
        self._language = localStorageService.get('language') || $translate.preferredLanguage();

        // Setting User Data Object
        self.setUserData = function (userObj) {
            self._user = userObj;
        };

        // Get User Data
        self.getUserData = function () {
            return self._user;
        };

        // Clear User Data
        self.clearUserData = function () {
            self._user = null;
            self._authorized = false;
        };

        // Authorize User
        self.authorizeUser = function () {
            self._authorized = true;
        };

        // Check if authorized
        self.isAuthorized = function () {
            return self._authorized;
        };

        // Get User Role
        self.getUserRole = function () {
            return (self._user) ? self._user.role : null;
        };

        // If Is Admin
        self.isAdmin = function (userRole) {
            return userRole === CONST.ROLE_ADMIN;
        };

        // Set Language
        self.setUserLanguage = function (lang) {
            self._language = lang;
        };

        // Get User Language
        this.getUserLanguage = function () {
            return self._language;
        }

    };

    angular.module('app').service('userDataService', ['CONST', '$translate', 'localStorageService', userDataFunc]);

})();