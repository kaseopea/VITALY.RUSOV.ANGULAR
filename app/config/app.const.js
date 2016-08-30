// MAIN APP CONSTANTS
// =====================================================================================================================
(function () {
    angular.module('app').constant('CONST', {
        
        // Feedback
        'FEEDBACK_EMAIL': 'feedback@angularproject.com',
        
        // User Roles
        'ROLE_USER': 'user',
        'ROLE_ADMIN': 'admin',
        
        // Validators
        'AGE_MINIMUM': 18,
        'AGE_MAXIMUM': 65,
        'MIN_NAME_LENGTH': 3,
        'MAX_WORDS_IN_NAME': 2,
        'MIN_BIO_LENGTH': 10,
        'MAX_BIO_LENGTH': 200,
        'SYMBOLS_START_CHECK_DATE': 6,
        'MIN_MESSAGE_LENGTH': 10,
        'MAX_MESSAGE_LENGTH': 200
    });
})();