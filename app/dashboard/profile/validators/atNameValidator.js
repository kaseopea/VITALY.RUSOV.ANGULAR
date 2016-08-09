// Name Validator
// =====================================================================================================================
(function () {
    var atNameValidatorFunc = function (CONST_VALIDATORS) {

        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // Validate for letters
                ctrl.$validators.nameValidator = function (modelValue) {
                    if (modelValue.length === 0) {
                        return false;
                    }
                    var REGEXP = new RegExp('^(([A-Z][a-zA-Z]+)|([A-Z][a-zA-Z]+\\s+[A-Z][a-zA-Z]+))$');
                    if (modelValue) {
                        return REGEXP.test(modelValue);
                    }
                };

                // Validate Number of words
                ctrl.$validators.nameWords = function (modelValue) {
                    var mValue, words;

                    if (typeof modelValue !== 'undefined') {
                        mValue = modelValue || '';
                        words = mValue.split(' ');
                        return _.inRange(words.length, 1, CONST_VALIDATORS.MAX_WORDS_IN_NAME + 1);
                    }
                };

                // Validate minimum name length
                ctrl.$validators.minNameLength = function (modelValue) {
                    var mValue = modelValue || '';
                    return mValue.length > CONST_VALIDATORS.MIN_NAME_LENGTH;
                };

            }
        };

    };

    angular.module('app.profile').directive('atNameValidator', ['CONST_VALIDATORS', atNameValidatorFunc]);
})();