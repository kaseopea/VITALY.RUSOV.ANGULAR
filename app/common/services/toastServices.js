// Toast Service
// =====================================================================================================================
(function () {

    var toastServiceFunc = function ($mdToast) {

        //
        this.show = function (message) {
            return $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(0)
            );
        };

    };

    angular.module('app').service('toastService', ['$mdToast', toastServiceFunc]);

})();