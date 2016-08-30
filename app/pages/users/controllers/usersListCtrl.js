// Users List Controller
// =====================================================================================================================
(function () {

    var usersListCtrlFunc = function ($state, $mdDialog, usersService, loaderService, toastService, httpLoggerService, $filter) {
        var vm = this;

        loaderService.addLoader();

        vm.loader = true;
        vm.showContent = false;

        // Get All Users
        usersService.getAllUsers().then(function (res) {
            httpLoggerService.logRequestTime(res);
            // $log.info('getAllUsers() [' + res.config.method + '] [' + res.config.url + '] [Params: ' + res.config.params + '] took ' + time + ' seconds.');
            vm.users = res.data.users;
            vm.loader = false;
            vm.showContent = true;
        });


        //Create New User
        vm.createNewUser = function () {

            // Show createUser Dialog
            $mdDialog.show({
                controller: 'createUserCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/users/tpl/createUser.tpl.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: true
            })
                .then(function (status) {
                    // new user created, update model
                    loaderService.showLoader();
                    usersService.getAllUsers().then(function (data) {
                        loaderService.hideLoader();
                        vm.users = data.data.users;
                    });
                });
        };

        //Create New User
        vm.editUser = function (login) {

            // Show createUser Dialog
            $mdDialog.show({
                controller: 'editUserCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/users/tpl/editUser.tpl.html',
                parent: angular.element(document.body),
                locals: {
                    login: login
                },
                clickOutsideToClose: false,
                fullscreen: true
            })
                .then(function (status) {
                    loaderService.showLoader();
                    // user info edited, update model
                    usersService.getAllUsers().then(function (data) {
                        loaderService.hideLoader();
                        vm.users = data.data.users;
                    });
                });
        };

        // Delete User
        vm.deleteUser = function (login) {
            var confirm = $mdDialog.confirm().title($filter('translate')('USERS.DELETE.TITLE'))
                .textContent($filter('translate')('USERS.DELETE.MESSAGE'))
                .ariaLabel($filter('translate')('USERS.DELETE.TITLE'))
                .ok($filter('translate')('USERS.DELETE.BUTTON_OK'))
                .cancel($filter('translate')('USERS.DELETE.BUTTON_CANCEL'));

            $mdDialog.show(confirm).then(function () {
                usersService.deleteUser(login)
                    .then(function (res) {
                        if (res.data.success) {
                            toastService.show('User successfully deleted!');
                            $mdDialog.hide('ok');
                            loaderService.showLoader();

                            usersService.getAllUsers().then(function (data) {
                                vm.users = data.data.users;
                                loaderService.hideLoader();
                            });
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

            });

        };


    };

    angular.module('app.users').controller('usersListCtrl', ['$state', '$mdDialog', 'usersService', 'loaderService', 'toastService', 'httpLoggerService', '$filter',usersListCtrlFunc]);

})();