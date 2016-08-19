'use strict';

// Action Item controller
// =====================================================================================================================
(function () {

    var atActionItemCtrlFunc = function atActionItemCtrlFunc(scope, element, attrs, $timeout, $interval) {
        var vm = this;
        var firstDelay = 3 * 1000;
        var checkInterval = 5 * 1000;
        var finalCheckDelay = 60 * 1000;
        var firstRun = true;
        var promiseCompleted = false;
        var promiseError = false;
        var checkIntervalID;
        var clicked = false;

        //Statuses
        //0 - Play (Default)
        //1 - In progress (loading)
        //2 - Success
        //3 - Error
        vm.statuses = ['play', 'progress', 'success', 'error'];
        vm.currentStatus = vm.statuses[0];

        // Get Status
        function getStatus() {
            return vm.currentStatus;
        }

        // Set status
        function setStatus(status) {
            vm.currentStatus = vm.statuses[status];
        }

        function processPromise() {
            if (promiseCompleted) {
                promiseError ? setStatus(3) : setStatus(2);
                //clear step
                firstRun = false;
                return true;
            } else {
                return false;
            }
        }

        // Start Action
        vm.actionStart = function () {
            if (!clicked) {
                var promise = scope.ngModel();
                if (firstRun) {
                    promise.then(function (res) {
                        promiseCompleted = true;
                    }).catch(function (err) {
                        promiseCompleted = true;
                        promiseError = true;
                    });

                    setStatus(1);

                    //start delay
                    $timeout(function () {
                        if (!processPromise()) {
                            checkIntervalID = $interval(function () {
                                if (processPromise()) {
                                    $interval.cancel(checkIntervalID);
                                }
                            }, checkInterval);

                            // Final check
                            $timeout(function () {
                                if (checkIntervalID) {
                                    $interval.cancel(checkIntervalID);
                                }
                                if (!processPromise()) {
                                    setStatus(3);
                                }
                            }, finalCheckDelay);
                        }
                    }, firstDelay);
                    firstRun = false;
                }

                clicked = true;
            }
        };
    };

    angular.module('atActionButton').controller('atActionItemCtrl', ['$scope', '$element', '$attrs', '$timeout', '$interval', atActionItemCtrlFunc]);
})();