
//Validation views
app.directive('nameValidator', ['CONST_VALIDATORS', function (CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {

            // more than 3 symbols
            // only first letter in uppercase
            // only letters

            ctrl.$validators.nameValidator = function (modelValue) {
                var mValue = modelValue || '';
                var words = mValue.split(' ');
                //var REGEXP= /^[A-Z][a-z]+(\s+[A-Z][a-z]+)?/;
                var REGEXP= /^[A-Z]([a-z]+)?/;
                var allValid = true;
                _.forEach(words, function (word) {
                    if(!REGEXP.test(word)) {
                        allValid = false;
                    }
                });
                return allValid;
                //return REGEXP.test(mValue);
            };

            ctrl.$validators.nameWords = function (modelValue) {
                var mValue = modelValue || '';
                var words = mValue.split(' ');
                return words.length <= CONST_VALIDATORS.MAX_WORDS_IN_NAME;
            }

            ctrl.$validators.nameLength = function (modelValue) {
                var mValue = modelValue || '';
                return mValue.length > CONST_VALIDATORS.MIN_NAME_LENGTH;
            };

        }
    }
}]);

app.directive('ageValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            // if it's a number
            // if it's not empty
            // if it fits age range 18..65
            ctrl.$validators.ageInteger = function(modelValue) {
                return (_.isNumber(parseInt(modelValue,10)) && !_.isNaN(parseInt(modelValue,10))) ? true : false;
            };

            ctrl.$validators.ageValidator = function (modelValue) {
                return (_.inRange(parseInt(modelValue,10), CONST_VALIDATORS.AGE_MINIMUM, CONST_VALIDATORS.AGE_MAXIMUM + 1));
            };

        }
    }
}]);

app.directive('greetingsValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {

            // check for minimum length
            ctrl.$validators.greetingsValidator = function (modelValue) {
                if (typeof modelValue == 'undefined') {
                    return false;
                }
                return (modelValue.length > CONST_VALIDATORS.GREETING_LENGTH) ? true : false;
            }
        }
    }
}]);

app.directive('dateValidator', ['CONST_VALIDATORS', function(CONST_VALIDATORS) {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            //check for date format
            ctrl.$validators.dateValidator = function (modelValue) {
                return moment(modelValue, attrs['dateFormat'], true).isValid();
            };

            ctrl.$validators.dateInFuture = function (modelValue) {
                var now = moment();
                var sendDate = moment(modelValue, attrs['dateFormat']);
                if(sendDate > CONST_VALIDATORS.SYMBOLS_START_CHECK_DATE) {
                    return moment(sendDate).isAfter(now);
                }

            }
        }
    }
}]);