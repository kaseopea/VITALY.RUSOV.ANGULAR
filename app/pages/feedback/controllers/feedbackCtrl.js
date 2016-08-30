// Feedback Controller
// =====================================================================================================================
(function () {

	var feedbackCtrlFunc = function (CONST, userDataService, emailService, $mdDialog, loaderService, $filter) {
		var vm = this;

		vm.loader = false;
		vm.showContent = true;

		vm.form = 'feedbackForm';

		var currentUser = userDataService.getUserData();
		vm.feedback = {};
		vm.feedback.name = currentUser.name;
		vm.feedback.email = currentUser.email;
		vm.feedback.message = 'Test message! Just for Test!';

		//Sending some constants to view
		vm.nameMaxWords = CONST.MAX_WORDS_IN_NAME;
		vm.minMessageLength = CONST.MIN_MESSAGE_LENGTH;
		vm.maxMessageLength = CONST.MAX_MESSAGE_LENGTH;

		// Submit Feedback Form Success
		vm.submitForm = function () {
			var supportEmails = [
				'support_1@mail.ru',
				'support_2@mail.ru',
				'support_3@mail.ru',
				'jackass@mail.ru',
				CONST.FEEDBACK_EMAIL
			];
			var signature = '\n---------\nAngular Project';

			vm.loader = true;
			vm.showContent = false;

			emailService.setContent(vm.feedback.message);
			emailService.sendFromDecorator(vm.feedback.email, supportEmails, signature)
				.then((mail) => {
					vm.feedback.message = '';
					vm.loader = false;
					vm.showContent = true;

					var alert = $mdDialog.alert({ title: $filter('translate')('FEEDBACK.MODAL.TITLE'), textContent: mail, ok: $filter('translate')('FEEDBACK.MODAL.CLOSE')});
					$mdDialog
						.show(alert)
						.finally(function () {
							alert = null;
						});
				})
				.catch((err) => {
					vm.feedback.message = '';
					vm.loader = false;
					vm.showContent = true;

					console.log('[' + $filter('translate')('FEEDBACK.ERRORS.FINALLY') + ']', $filter('translate')(err));
					var alert = $mdDialog.alert({ title: $filter('translate')('FEEDBACK.MODAL.TITLE_ERROR'), textContent: $filter('translate')(err), ok: $filter('translate')('FEEDBACK.MODAL.CLOSE')});
					$mdDialog
						.show(alert)
						.finally(function () {
							alert = null;
						});
				});
		};


		vm.submitFormError = function () {
			var supportEmails = [
				'support_1@mail.ru',
				'support_2@mail.ru',
				'support_3@mail.ru',
				CONST.FEEDBACK_EMAIL
			];
			var signature = '\n---------\nAngular Project';

			vm.loader = true;
			vm.showContent = false;

			emailService.setContent(vm.feedback.message);
			emailService.sendFromDecorator(vm.feedback.email, supportEmails, signature)
				.then((mail) => {
					vm.feedback.message = '';
					vm.loader = false;
					vm.showContent = true;

					var alert = $mdDialog.alert({ title: $filter('translate')('FEEDBACK.MODAL.TITLE'), textContent: mail, ok: $filter('translate')('FEEDBACK.MODAL.CLOSE')});
					$mdDialog
						.show(alert)
						.finally(function () {
							alert = null;
						});
				})
				.catch((err) => {
					vm.feedback.message = '';
					vm.loader = false;
					vm.showContent = true;

					console.log('[' + $filter('translate')('FEEDBACK.ERRORS.FINALLY') + ']', $filter('translate')(err));
					var alert = $mdDialog.alert({ title: $filter('translate')('FEEDBACK.MODAL.TITLE_ERROR'), textContent: $filter('translate')(err), ok: $filter('translate')('FEEDBACK.MODAL.CLOSE')});
					$mdDialog
						.show(alert)
						.finally(function () {
							alert = null;
						});
				});
		};
	};

	angular.module('app.feedback').controller('feedbackCtrl', ['CONST', 'userDataService', 'emailService', '$mdDialog', 'loaderService', '$filter', feedbackCtrlFunc]);

})();