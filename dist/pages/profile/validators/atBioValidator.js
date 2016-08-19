'use strict';

// Bio Validator
// =====================================================================================================================
(function () {
    var atBioValidatorFunc = function atBioValidatorFunc(CONST_VALIDATORS) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function link(scope, elem, attrs, ctrl) {

                // check for minimum length
                ctrl.$validators.bioValidator = function (modelValue) {
                    if (modelValue) {
                        return modelValue.length >= CONST_VALIDATORS.MIN_BIO_LENGTH;
                    }
                };
            }
        };
    };
    angular.module('app.profile').directive('atBioValidator', ['CONST_VALIDATORS', atBioValidatorFunc]);
})();