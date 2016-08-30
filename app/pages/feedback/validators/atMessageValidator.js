// Message Validator
// =====================================================================================================================
(function () {
    var atMessageValidatorFunc = function (CONST) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

                // check for minimum length
                ctrl.$validators.messageValidator = function (modelValue) {
                    return (modelValue) ? modelValue.length >= CONST.MIN_MESSAGE_LENGTH : false;
                };
            }
        };
    };
    angular.module('app.feedback').directive('atMessageValidator', ['CONST', atMessageValidatorFunc]);
})();
