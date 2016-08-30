// Http Logger Service
// =====================================================================================================================
(function () {

    var httpLoggerServiceFunc = function ($log) {

        this.logRequestTime = function (response) {
            var time = (response.config.responseTimestamp - response.config.requestTimestamp) / 1000;
            var method = response.config.method;
            var url = response.config.url;
            var params = (response.config.params) ? '[Params: ' + response.config.params + ']' : '';
            var output = '[' + method + '] [' + url + ']' + params + ' took ' + time + ' seconds';

            $log.info(output);

            return output;

        };

    };

    angular.module('app').service('httpLoggerService', ['$log', httpLoggerServiceFunc]);

})();