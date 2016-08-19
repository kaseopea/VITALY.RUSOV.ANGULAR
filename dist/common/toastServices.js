'use strict';

// Toast Service
// =====================================================================================================================
(function () {

    var toastServiceFunc = function toastServiceFunc($mdToast) {

        //
        this.show = function (message) {
            return $mdToast.show($mdToast.simple().position('top right').textContent(message));
        };
    };

    angular.module('app').service('toastService', ['$mdToast', toastServiceFunc]);
})();