// MAIN APP RUN
// =====================================================================================================================

(function () {
    var appRunFunc = function ($rootScope, $state, localStorageService, $translate) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            var stateIsProtected = toState.data && toState.data.secure;

            // todo: THis check should be more complicated)
            if (stateIsProtected && !localStorageService.get('loggedIn')) {
                event.preventDefault();
                $state.go('login');
            }
        });


        // Setting language selected from localstorage or default if not specified
        $rootScope.language = localStorageService.get('language') || $translate.preferredLanguage();
        $translate.use($rootScope.language);
    };

    angular.module('app').run(['$rootScope', '$state', 'localStorageService', '$translate', appRunFunc]);
})();