// AGE Validator
// =====================================================================================================================
(function () {
    var atAgeValidatorFunc = function (CONST) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // Age Integer Check
                ctrl.$validators.ageInteger = function (modelValue) {
                    return _.isNumber(parseInt(modelValue, 10)) && !_.isNaN(parseInt(modelValue, 10));
                };

                ctrl.$validators.ageValidator = function (modelValue) {
                    return _.inRange(parseInt(modelValue, 10), CONST.AGE_MINIMUM, CONST.AGE_MAXIMUM + 1);
                };

            }
        };
    };
    angular.module('app.profile').directive('atAgeValidator', ['CONST', atAgeValidatorFunc]);
})();