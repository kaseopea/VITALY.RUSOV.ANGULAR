// Language controller
// =====================================================================================================================
(function () {

    var langCtrlFunc = function ($translate, localStorageService, userDataService) {
        var vm = this;

        vm.activeLanguage = userDataService.getUserLanguage();

        vm.switchLang = function (key) {
            $translate.use(key);
            localStorageService.set('language', key);
            vm.activeLanguage = key;
        };
    };

    angular.module('app').controller('languageCtrl', ['$translate', 'localStorageService', 'userDataService', langCtrlFunc]);

})();