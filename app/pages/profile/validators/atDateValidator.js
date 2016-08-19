// Biography Validator
// =====================================================================================================================
(function () {
    var atDateValidatorFunc = function (CONST_VALIDATORS) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {

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
            }
        };
    };

    angular.module('app.profile').directive('atDateValidator', ['CONST_VALIDATORS', atDateValidatorFunc]);
})();