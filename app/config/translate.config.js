// TRANSLATE CONFIG
// =====================================================================================================================
(function () {

	var translateProviderConfigFunc = function ($translateProvider) {

		$translateProvider.useSanitizeValueStrategy('escaped');
		$translateProvider.preferredLanguage('en');

		$translateProvider.useStaticFilesLoader({
			prefix: 'app/lang/lang-',
			suffix: '.json'
		});
	};



    angular.module('app').config(['$translateProvider', translateProviderConfigFunc]);
})();