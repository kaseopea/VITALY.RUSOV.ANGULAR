// Name Validator
// =====================================================================================================================
(function () {
    var atNameValidatorFunc = function (CONST) {

        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // Validate for letters
                ctrl.$validators.nameValidator = function (modelValue) {
                    if (!modelValue) {
                        return false;
                    }
                    var REGEXP = new RegExp('^(([A-Z][a-zA-Z]+)|([A-Z][a-zA-Z]+\\s+[A-Z][a-zA-Z]+))$');
                    return (modelValue) ? REGEXP.test(modelValue) : false;
                };

                // Validate Number of words
                ctrl.$validators.nameWords = function (modelValue) {
                    var mValue, words;

                    if (modelValue) {
                        mValue = modelValue || '';
                        words = mValue.split(' ');
                        return _.inRange(words.length, 1, CONST.MAX_WORDS_IN_NAME + 1);
                    } else {
                        return false;
                    }
                };

                // Validate minimum name length
                ctrl.$validators.minNameLength = function (modelValue) {
                    var mValue = modelValue || '';
                    return mValue.length > CONST.MIN_NAME_LENGTH;
                };

            }
        };

    };

    angular.module('app.profile').directive('atNameValidator', ['CONST', atNameValidatorFunc]);
})();