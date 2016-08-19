// MAIN APP
// =====================================================================================================================
'use strict';
(function () {

    // Bootstrapping
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

    // Main App module
    angular.module('app', ['ui.router', 'angular-loading-bar', 'pascalprecht.translate', 'ngMaterial', 'ngMessages', 'LocalStorageModule', 'app.auth', 'app.profile', 'atActionButton']);

})();

