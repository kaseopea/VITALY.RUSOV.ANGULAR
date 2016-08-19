'use strict';

// View Profile Controller
// =====================================================================================================================
(function () {

    var profileViewCtrlFunc = function profileViewCtrlFunc($http, $scope, $rootScope, $state, localStorageService, profileService) {
        var vm = this;
        var currentUser = angular.fromJson(localStorageService.get('user'));

        vm.loader = true;
        vm.showContent = false;

        //setting current tab
        $rootScope.currentNavItem = $state.current.name;

        profileService.getUserProfile(currentUser.email).then(function (res) {
            vm.user = res.data.user;
            vm.loader = false;
            vm.showContent = true;
        });
    };
    angular.module('app.profile').controller('profileViewCtrl', ['$http', '$scope', '$rootScope', '$state', 'localStorageService', 'profileService', profileViewCtrlFunc]);
})();