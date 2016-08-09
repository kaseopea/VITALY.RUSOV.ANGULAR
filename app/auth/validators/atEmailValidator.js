// Email Validator
// =====================================================================================================================
(function () {
    var atEmailValidatorFunc = function (CONST_VALIDATORS) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // Age Integer Check
                ctrl.$validators.emailValidator = function (modelValue) {
                    if (!modelValue) {
                        return false;
                    }

                    // http://emailregex.com/
                    var REGEXP = new RegExp('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$', 'i');
                    if (modelValue) {
                        return REGEXP.test(modelValue);
                    }
                };

            }
        };
    };
    angular.module('app').directive('atEmailValidator', ['CONST_VALIDATORS', atEmailValidatorFunc]);
})();