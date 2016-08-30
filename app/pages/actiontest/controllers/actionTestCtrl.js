// Action Test Controller
// =====================================================================================================================
(function () {

    var actionTestCtrlFunc = function ($http, $filter, toastService, $log, $actionButton) {
        var vm = this;
		var button1 = 'button1';
		var button2 = 'button2';


        // Test 1 Function that returns promise (fast no delay)
        var testAction1 = function () {
          return $http({
              method: 'GET',
              url: '/action_req_1'
          });
        };

        // Test 2 Slow
        var testAction2 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_2'
            });
        };

        // Test 3. 5 sec delay and error
        var testAction3 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_3'
            });
        };


        // Test 4. Slowest. More than final delay
        var testAction4 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_4'
            });
        };

        // Test 4. Slowest. More than final delay
        var testAction5 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_5'
            });
        };
		
		
		$actionButton.addButton(button1);
		$actionButton.addAction(button1, {
			title: 'ACTIONTEST.ACTION1_TEXT',
			action: testAction1,
			callback: function () {
				$log.info('Action 1 finished');
				toastService.show('Action 1 finished');
			}
		});
		$actionButton.addAction(button1, {
			title: 'ACTIONTEST.ACTION2_TEXT',
			action: testAction2,
			callback: function () {
				$log.info('Action 2 finished');
				toastService.show('Action 2 finished');
			}
		});


		$actionButton.addButton(button2);
		$actionButton.addAction(button2, {
			title: 'ACTIONTEST.ACTION3_TEXT',
			action: testAction3,
			callback: function () {
				$log.info('Action 3 finished');
				toastService.show('Action 3 finished');
			},
			errorCallback: function () {
				$log.info('Error in Action 3!');
			}
		});
		$actionButton.addAction(button2, {
			title: 'ACTIONTEST.ACTION4_TEXT',
			action: testAction4,
			callback: function () {
				$log.info('Action 4 finished');
				toastService.show('Action 4 finished');
			}
		});
		$actionButton.addAction(button2, {
			title: 'ACTIONTEST.ACTION5_TEXT',
			action: testAction5,
			callback: function () {
				$log.info('Action 5 finished');
				toastService.show('Action 5 finished');
			}
		});
		// $actionButton.clearActions(button2);

		vm.testActions1 = $actionButton.getActions(button1);
		vm.testActions2 = $actionButton.getActions(button2);

		
    };

    angular.module('app').controller('actionTestCtrl', ['$http', '$filter', 'toastService', '$log', '$actionButton', actionTestCtrlFunc]);

})();