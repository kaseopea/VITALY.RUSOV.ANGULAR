'use strict';

// MAIN APP CONFIG
// =====================================================================================================================
(function () {

    var appConfig = function appConfig($mdThemingProvider, localStorageServiceProvider, cfpLoadingBarProvider, $httpProvider) {

        // Loading Bar config
        // =============================================================================================================
        cfpLoadingBarProvider.includeSpinner = false;

        // LocalStorage config
        // =============================================================================================================
        localStorageServiceProvider.setPrefix('at');

        // Material config
        // =============================================================================================================
        $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('orange').warnPalette('red');

        // HTTP Interceptor for 401 Status code
        // =============================================================================================================
        $httpProvider.interceptors.push(['$q', '$window', function ($q, $window) {
            return {
                'responseError': function responseError(rejection) {
                    if (rejection.status === 401) {
                        console.log(rejection);
                        $window.location = '/';
                    }
                    return $q.reject(rejection);
                }
            };
        }]);
    };

    angular.module('app').config(['$mdThemingProvider', 'localStorageServiceProvider', 'cfpLoadingBarProvider', '$httpProvider', appConfig]);
})();