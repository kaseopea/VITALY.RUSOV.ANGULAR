app.directive('atDateValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            //check for date format
            ctrl.$validators.dateValidator = function (modelValue) {
                var formatPlus1 = attrs['dateFormat']
                    .toLowerCase()
                    .replace('dd', 'd')
                    .replace('mm', 'm')
                    .toUpperCase();
                var formatPlus2 = formatPlus1
                    .toLowerCase()
                    .replace('yyyy', 'yy')
                    .toUpperCase();

                var check1 = moment(modelValue, formatPlus1, true).isValid();
                var check2 = moment(modelValue, formatPlus2, true).isValid();

                return (moment(modelValue, attrs['dateFormat'], true).isValid()) || check1 || check2;
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