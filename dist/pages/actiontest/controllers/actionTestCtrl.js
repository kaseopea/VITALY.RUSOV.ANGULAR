'use strict';

// Action Test Controller
// =====================================================================================================================
(function () {

    var actionTestCtrlFunc = function actionTestCtrlFunc($http) {
        var vm = this;

        // Test 1 Function that returns promise (fast no delay)
        vm.testAction1 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_1'
            });
        };

        // Test 2 Slow
        vm.testAction2 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_2'
            });
        };

        // Test 3. 5 sec delay and error
        vm.testAction3 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_3'
            });
        };

        // Test 4. Slowest. More than final delay
        vm.testAction4 = function () {
            return $http({
                method: 'GET',
                url: '/action_req_4'
            });
        };
    };

    angular.module('app').controller('actionTestCtrl', ['$http', actionTestCtrlFunc]);
})();