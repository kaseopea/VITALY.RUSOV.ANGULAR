app.directive('atAgeValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            // if it's a number
            // if it's not empty
            // if it fits age range 18..65

            // Age Integer Check
            ctrl.$validators.ageInteger = function(modelValue) {
                return _.isNumber(parseInt(modelValue,10)) && !_.isNaN(parseInt(modelValue,10));
            };

            ctrl.$validators.ageValidator = function (modelValue) {
                return _.inRange(parseInt(modelValue,10), CONST_VALIDATORS.AGE_MINIMUM, CONST_VALIDATORS.AGE_MAXIMUM + 1);
            };

        }
    };
}]);