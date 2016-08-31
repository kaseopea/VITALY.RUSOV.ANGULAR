// Feedback Controller
// =====================================================================================================================
(function () {

	var emailServiceDecorator = function ($delegate, $q, $filter) {
		var self = $delegate;
		var originalSEND = $delegate.SEND;

		var _mail = {
			from: null,
			to: [],
			content: null,
			signature: null
		};

		// Set Content
		$delegate.setContent = function (content) {
			_mail.content = content;
		};

		// Set From
		$delegate.setFrom = function (fromEmail) {
			_mail.from = fromEmail;
		};

		// Set To
		$delegate.setTo = function (to) {
			_mail.to = to;
		};

		// Set Signature
		$delegate.setSignature = function (signature) {
			_mail.signature = signature;
		};


		// Send from decorator method
		$delegate.sendFromDecorator = function (from, to, signature) {
			var deferred = $q.defer();
			var emails = to;

			// setting values;
			$delegate.setFrom(arguments[0]);
			$delegate.setTo(arguments[1]);
			$delegate.setSignature(signature);

			deferred.resolve(emails.reduce((p, i) => p.catch(
				() => $q(function (resolve, reject) {
					originalSEND(_mail.from, i, _mail.content + _mail.signature).catch(function (err) {
						console.warn($filter('translate')(err) + '\n');
						reject(err);
					}).then(function (data) {
						if (data) {
							console.info(data + '\n');
							resolve(data);
						}
					})
				})
			), $q.reject()).catch(function (err) {
				throw $filter('translate')(err);
			}));
			return deferred.promise;
		};
		return $delegate;
	};

	angular.module('app.feedbackDecorated').config(['$provide', function ($provide) {
		$provide.decorator('emailService', ['$delegate', '$q', '$filter', emailServiceDecorator]);
	}]);

})();