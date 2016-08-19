'use strict';

// TRANSLATE CONFIG
// =====================================================================================================================
(function () {
    angular.module('app').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.preferredLanguage('en');

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/lang/lang-',
            suffix: '.json'
        });
    }]);
})();