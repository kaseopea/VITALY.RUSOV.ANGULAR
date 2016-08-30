// Email Service
// =====================================================================================================================
(function () {

	var emailServiceFunc = function ($q, CONST, $timeout) {

		// SEND method
		this.SEND = function (from, to = CONST.FEEDBACK_EMAIL, content) {
			var deferred = $q.defer();

			if (to === 'jackass@mail.ru') {
				var email = from + '\n' + to + '\n' + content;
				$timeout(() => deferred.resolve(email), 1000);
			} else {
				$timeout(() => deferred.reject('FEEDBACK.ERRORS.SEND_ERROR'), 1000);
			}
			return deferred.promise;
		};
	};
	angular.module('app.feedback').service('emailService', ['$q', 'CONST', '$timeout', emailServiceFunc]);

})();