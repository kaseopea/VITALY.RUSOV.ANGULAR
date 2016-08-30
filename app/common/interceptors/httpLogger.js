// HTTP Logger Interceptor
// =====================================================================================================================
(function () {

    var httpLoggerInterceptorFunc = function (httpLoggerService) {

        var httpLoggerInterceptor = {
            request: function(config) {
                config.requestTimestamp = new Date().getTime();
                return config;
            },
            response: function(response) {
                response.config.responseTimestamp = new Date().getTime();
                // httpLoggerService.logRequestTime(response);
                return response;
            }
        };

        return httpLoggerInterceptor;

    };

    angular.module('app').factory('httpLoggerInterceptor', ['httpLoggerService', httpLoggerInterceptorFunc]);

})();