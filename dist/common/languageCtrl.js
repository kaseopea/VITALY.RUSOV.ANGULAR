'use strict';

// Language controller
// =====================================================================================================================
(function () {

    var langCtrlFunc = function langCtrlFunc($scope, $rootScope, $translate, localStorageService) {
        var vm = this;

        vm.activeLanguage = $rootScope.language || $translate.preferredLanguage();

        vm.switchLang = function (key) {
            $translate.use(key);
            localStorageService.set('language', key);
            vm.activeLanguage = key;
        };
    };

    angular.module('app').controller('languageCtrl', ['$scope', '$rootScope', '$translate', 'localStorageService', langCtrlFunc]);
})();