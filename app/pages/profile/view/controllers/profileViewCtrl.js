// View Profile Controller
// =====================================================================================================================
(function () {

    var profileViewCtrlFunc = function ($rootScope, $state, userDataService, profileService ) {
        var vm = this;
        var currentUser = userDataService.getUserData();

        vm.loader = true;
        vm.showContent = false;

        //setting current tab
        $rootScope.currentNavItem = $state.current.name;

        profileService.getUserProfile(currentUser.email)
            .then(function(res) {
                vm.user = res.data.user;
                vm.loader = false;
                vm.showContent = true;
            });
    };
    angular.module('app.profile').controller('profileViewCtrl', ['$rootScope', '$state', 'userDataService', 'profileService', profileViewCtrlFunc]);

})();