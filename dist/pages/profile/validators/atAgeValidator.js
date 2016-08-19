'use strict';

// AGE Validator
// =====================================================================================================================
(function () {
    var atAgeValidatorFunc = function atAgeValidatorFunc(CONST_VALIDATORS) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function link(scope, elem, attrs, ctrl) {

                // Age Integer Check
                ctrl.$validators.ageInteger = function (modelValue) {
                    return _.isNumber(parseInt(modelValue, 10)) && !_.isNaN(parseInt(modelValue, 10));
                };

                ctrl.$validators.ageValidator = function (modelValue) {
                    return _.inRange(parseInt(modelValue, 10), CONST_VALIDATORS.AGE_MINIMUM, CONST_VALIDATORS.AGE_MAXIMUM + 1);
                };
            }
        };
    };
    angular.module('app.profile').directive('atAgeValidator', ['CONST_VALIDATORS', atAgeValidatorFunc]);
})();