// Startup Time Provide
// =====================================================================================================================

(function () {

	var startupAppTimeFunc = function startupAppTimeProvider() {
		var now = moment();
		var dateFormat = 'DD MMMM YYYY, HH:mm:ss, dddd';

		return {
			setDateFormat: function(format) {
				dateFormat = format;
			},
			$get: ['localStorageService', function (localStorageService) {

				function getAppStartupTime() {
					var stored = localStorageService.get('startupAppTime');

					if (stored) {
						now = stored;
						return moment(stored).format(dateFormat);
					} else {
						var now = moment();
						localStorageService.set('startupAppTime', now);
						return now.format(dateFormat);
					}

				}

				function clearAppStartupTime() {
					localStorageService.remove('startupAppTime');
				}

				return {
					getAppStartupTime: getAppStartupTime,
					clearAppStartupTime: clearAppStartupTime
				}
			}]
		};
	};

	angular.module('app').provider('startupAppTime', [startupAppTimeFunc]);

})();
