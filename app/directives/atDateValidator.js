app.directive('atDateValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            //check for date format
            ctrl.$validators.dateValidator = function (modelValue) {
                var formatPlus = attrs['dateFormat']
                    .toLowerCase()
                    .replace('dd', 'd')
                    .replace('mm', 'm')
                    .toUpperCase();

                var checkPlus = moment(modelValue, formatPlus, true).isValid();

                return (moment(modelValue, attrs['dateFormat'], true).isValid()) || checkPlus;
            };

            ctrl.$validators.dateInFuture = function (modelValue) {
                var now = moment();
                var sendDate = moment(modelValue, attrs['dateFormat']);
                if(sendDate > CONST_VALIDATORS.SYMBOLS_START_CHECK_DATE) {
                    return moment(sendDate).isAfter(now);
                }

            };
        }
    };
}]);