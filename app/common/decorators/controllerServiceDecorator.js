// $controller Service Decorator
// =====================================================================================================================

(function () {

	var controllerServiceDecoratorFunc = function $controllerDecorator($delegate, $log, $injector) {
		return function () {
			var constructor = arguments[0];
			var locals = arguments[1];
			var logOrNot = false;

			var ctrl = $delegate.apply(null, arguments);


			if (_.isString(constructor)) {
				var listOfInjections = $injector.annotate(ctrl.constructor);
				// ctrl.constructor.$inject = ['$log'];
			}

			if(logOrNot) {
				//Custom decorator code
				console.groupCollapsed(_.isString(constructor) ? constructor : 'Anonymous controller');
				$log.info('Controller', constructor);
				$log.info('Locals', locals);
				$log.info('Arguments', arguments);
				if (_.isString(constructor)) {
					$log.info('Injections', listOfInjections);
				}
				console.groupEnd();
			}


			return ctrl;
		};
	};

	angular.module('controllerServiceDecorator', [], ['$provide', function ($provide) {
		$provide.decorator('$controller', ['$delegate', '$log', '$injector', controllerServiceDecoratorFunc]);
	}]);

})();
