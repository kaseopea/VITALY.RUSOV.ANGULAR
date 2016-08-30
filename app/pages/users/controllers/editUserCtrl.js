// Edit User Controller
// =====================================================================================================================
(function () {

    var editUserCtrlFunc = function (CONST, usersService, $mdDialog, loaderService, toastService, login, userDataService) {
        var vm = this;

        //Sending some constants to view
        vm.nameMaxWords = CONST.MAX_WORDS_IN_NAME;
        vm.minAge = CONST.AGE_MINIMUM;
        vm.maxAge = CONST.AGE_MAXIMUM;
        vm.bioMaxLength = CONST.MAX_BIO_LENGTH;

        vm.loader = true;
        vm.showContent = false;

        //check if is admin
        vm.isAdmin = userDataService.isAdmin(userDataService.getUserRole());
        vm.adminRole = CONST.ROLE_ADMIN;

        //Get user model from server
        usersService.getUser(login).then(function (res) {
            vm.user = res.data.user;
            vm.loader = false;
            vm.showContent = true;
        });

        // Cancel Dialog
        vm.cancel = function () {
            $mdDialog.cancel();
        };

        // Submit Edit Form
        vm.submitForm = function () {
            loaderService.showLoader();
            usersService.updateUser(vm.user)
                .then(function (res) {
                    if (res.data.success) {
                        toastService.show('User info successfully edited!');
                        loaderService.hideLoader();
                        $mdDialog.hide('ok');
                    } else {
                        toastService.show(res.data.error.message);
                        loaderService.hideLoader();
                        $mdDialog.hide('error');
                    }
                })
                .catch(function (err) {
                    toastService.show(err);
                    loaderService.hideLoader();
                    $mdDialog.hide('error');
                });

        };


    };

    angular.module('app.users').controller('editUserCtrl', ['CONST', 'usersService', '$mdDialog', 'loaderService', 'toastService', 'login', 'userDataService', editUserCtrlFunc]);

})();