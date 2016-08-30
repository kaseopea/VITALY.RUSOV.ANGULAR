// MAIN APP CONFIG
// =====================================================================================================================
(function () {

    var appConfig = function ($mdThemingProvider, localStorageServiceProvider, $httpProvider, startupAppTimeProvider) {

        //startupAppTimeProvider
        // =============================================================================================================
        startupAppTimeProvider
			.setDateFormat('dddd, MMMM Do YYYY, h:mm:ss a');

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


        // HTTP Interceptor for 401 Status code
        // =============================================================================================================
        $httpProvider.interceptors.push('httpLoggerInterceptor');
        $httpProvider.interceptors.push(['$q', '$window', function($q, $window) {
            return {
                'responseError': function(rejection) {
                    if(rejection.status === 401 ) {
                        console.log(rejection);
                        $window.location = '/';
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

    };

    angular.module('app').config(['$mdThemingProvider', 'localStorageServiceProvider', '$httpProvider', 'startupAppTimeProvider', appConfig]);

})();