'use strict';
// Bootstrapping
angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

var app = angular.module('app', ['ui.router']);

// App constants
app.constant('CONST_VALIDATORS', {
    'AGE_MINIMUM': 18,
    'AGE_MAXIMUM': 65,
    'MIN_NAME_LENGTH': 3,
    'MAX_WORDS_IN_NAME': 2,
    'GREETING_LENGTH': 10,
    'SYMBOLS_START_CHECK_DATE': 6
});