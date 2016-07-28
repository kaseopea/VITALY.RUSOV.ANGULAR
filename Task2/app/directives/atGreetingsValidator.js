app.directive('atGreetingsValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {

            // check for minimum length
            ctrl.$validators.greetingsValidator = function (modelValue) {
                if (modelValue) {
                    return modelValue.length >= CONST_VALIDATORS.MIN_GREETING_LENGTH;
                }
            };
        }
    };
}]);
