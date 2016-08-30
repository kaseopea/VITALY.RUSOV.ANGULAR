// MAIN APP
// =====================================================================================================================
'use strict';
(function () {

	// Bootstrapping
	angular.element(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});

	// Main App module
	angular.module('app', [
		'controllerServiceDecorator',
		'ui.router',
		'pascalprecht.translate',
		'ngMaterial',
		'ngMessages',
		'LocalStorageModule',
		'app.auth',
		'app.profile',
		'app.users',
		'app.feedback',
		'app.feedbackDecorated',
		'atActionButton'
	]);

})();

