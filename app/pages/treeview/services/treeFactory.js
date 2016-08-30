// Tree View Service
// =====================================================================================================================
(function () {
    var treeViewFactoryFunc = function ($http, $q, $timeout) {

        var heapStorage = [];
        // var heapStorage = new Array();
        var count = 1;

        // NODE ENTITY
        // =============================================================================================================
        class atNODE {
            constructor(nodeObj) {
                this.id = nodeObj.id || String('node' + atNODE._guid++);
                this.metadata = nodeObj.metadata;
                this._parent = null;
                this._children = [];
            }

            // Get children Method
            // =============================================================================
            getChildren() {
                var self = this;
                var defer = $q.defer();

                //find children in heapStorage
                var children = _.map(self._children, (childId) => _.find(heapStorage, (node) => node.id === childId));

                defer.resolve(children);
                return defer.promise;
            }

            // Add children Method
            // =============================================================================
            addChildren(childId) {
                var self = this;
                var defer = $q.defer();
                // var timeGap = $timeout(angular.noop, 0);
                var timeGap = $timeout(angular.noop, 1000 + 2 * 1000 * Math.random());

                timeGap.then(() => {
                    self._children.push(childId);
                    var child = _.find(heapStorage, (node) => node.id == childId);
                    // console.log((count++) + ' [Child Added] [ID: ' + childId + ']', child.metadata.title);

                    defer.resolve();

                });

                return defer.promise;
            }

        }

        // GUID
        atNODE._guid = 0;


        // Factory Exports
        // =============================================================================================================
        return {
            atNODE: atNODE,
            // =============================================================================
            trees: {
                add: function (rootNode) {
                    var defer = $q.defer();
                    // metadata check
                    if (!rootNode.metadata) {
                        defer.reject('Incorrect node metadata');
                    }
                    // add node to heapStorage
                    heapStorage.push(rootNode);
                    console.log('0 [ROOT  Added] ' + '[ID: ' + rootNode.id + ']', rootNode.metadata.title);

                    defer.resolve(rootNode);
                    return defer.promise;
                },
                remove: function () {
                    var defer = $q.defer();
                    heapStorage = null;
                    defer.resolve(heapStorage);
                    return defer.promise;
                }
            },
            // =============================================================================
            nodes: {
                add: function (node) {
                    var defer = $q.defer();
                    // metadata check
                    if (!node.metadata) {
                        defer.reject('Incorrect node metadata');
                    }
                    // add node to heapStorage
                    heapStorage.push(node);

                    // resolve node
                    defer.resolve(node);
                    return defer.promise;
                },
                delete: function () {
                    console.log('Delete node from Tree')
                }
            },
            // =============================================================================
            render: {
                heapStorage: function () {
                    return heapStorage;
                    // var defer = $q.defer();
                    // defer.resolve(heapStorage);
                    // return defer.promise;
                }
            }

        };

    };

    angular.module('app').factory('treeViewFactory', ['$http', '$q', '$timeout', treeViewFactoryFunc]);

})();