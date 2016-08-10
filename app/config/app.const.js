// MAIN APP CONSTANTS
// =====================================================================================================================
(function () {
    angular.module('app').constant('CONST_VALIDATORS', {
        // Age validator
        'AGE_MINIMUM': 18,
        'AGE_MAXIMUM': 65,

        // Name validator
        'MIN_NAME_LENGTH': 3,
        'MAX_WORDS_IN_NAME': 2,

        // Greeting validator
        'MIN_BIO_LENGTH': 10,
        'MAX_BIO_LENGTH': 200,

        // Date validator
        'SYMBOLS_START_CHECK_DATE': 6
    });
})();