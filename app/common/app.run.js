// MAIN APP RUN
// =====================================================================================================================

(function () {
    var appRunFunc = function ($rootScope, $state, localStorageService, authService, userDataService, $translate) {
	    $translate.use(userDataService.getUserLanguage());
    };

    angular.module('app').run(['$rootScope', '$state', 'localStorageService', 'authService', 'userDataService', '$translate', appRunFunc]);
})();