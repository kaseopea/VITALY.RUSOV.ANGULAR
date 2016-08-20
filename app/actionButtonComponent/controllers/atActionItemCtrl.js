// Action Item controller
// =====================================================================================================================
(function () {

    var atActionItemCtrlFunc = function (scope, element, attrs, $timeout, $q) {
        var vm = this;
        var firstDelay = 3 * 1000;
        var finalCheckDelay = 60 * 1000;
        var firstTimeout, lastTimeout;
        var clicked = false;
        var actionPromise;
        var statuses;

        //Statuses
        //0 - Play (Default)
        //1 - In progress (loading)
        //2 - Success
        //3 - Error
        statuses = ['play', 'progress', 'success', 'error'];
        vm.currentStatus = statuses[0];

        // Set status
        function setStatus(status) {
            vm.currentStatus = statuses[status];
        }

        // Start Action
        vm.actionStart = function () {
            if (!clicked) {
                setStatus(1);
                actionPromise = scope.ngModel();

                firstTimeout = $timeout(angular.noop, firstDelay);
                lastTimeout = $timeout(angular.noop, finalCheckDelay);


                firstTimeout.then(function () {
                        return $q.race([actionPromise,lastTimeout]);
                    })
                    .then(function (res) {
                        if (res) {
                            //setting status based on res success
                            setStatus(res.data.success ? 2 : 3);
                        } else {
                            // final check error with no response
                            setStatus(3);
                        }
                        // clear last timeout
                        $timeout.cancel(lastTimeout);
                    })
                    .catch(function (err) {
                        // if something go wrong on serverside
                        setStatus(3);
                    });

                clicked = true;
            }
        }

    };

    angular.module('atActionButton').controller('atActionItemCtrl', ['$scope', '$element', '$attrs', '$timeout', '$q', atActionItemCtrlFunc]);

})();