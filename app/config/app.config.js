// MAIN APP CONFIG
// =====================================================================================================================
(function () {

    var appConfig = function ($mdThemingProvider, localStorageServiceProvider, cfpLoadingBarProvider, $httpProvider) {


        // Loading Bar config
        // =============================================================================================================
        cfpLoadingBarProvider.includeSpinner = false;

        // LocalStorage config
        // =============================================================================================================
        localStorageServiceProvider
            .setPrefix('at');

        // Material config
        // =============================================================================================================
        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange')
            .warnPalette('red');


        // HTTP Interceptor
        // =============================================================================================================

        //$httpProvider.interceptors.push(['$q', '$injector', '$state', function($q, $injector, $state) {
        //    return {
        //        'response': function(res) {
        //
        //            //$injector.get('$state').transitionTo('login');
        //            return res;
        //        },
        //        'responseError': function(rejection) {
        //            return $q.reject(rejection);
        //        }
        //    };
        //}]);

    };

    angular.module('app').config(['$mdThemingProvider', 'localStorageServiceProvider', 'cfpLoadingBarProvider', '$httpProvider', appConfig]);

})();