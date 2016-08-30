// Create User Controller
// =====================================================================================================================
(function () {

	var createUserCtrlFunc = function (usersService, $mdDialog, loaderService, toastService) {
		var vm = this;

		loaderService.addLoader();

		vm.cancel = function() {
			$mdDialog.cancel();
		};

		vm.submitForm = function () {
			loaderService.showLoader();

			usersService.createUser(vm.user)
				.then(function (res) {
					if (res.data.success) {
						toastService.show('User successfully created!');
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

	angular.module('app.users').controller('createUserCtrl', ['usersService', '$mdDialog', 'loaderService', 'toastService', createUserCtrlFunc]);

})();