'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Tree View Service
// =====================================================================================================================
(function () {
    var treeviewServiceFunc = function treeviewServiceFunc($http, $q) {

        // NODE ENTITY
        // =============================================================================================================
        var NODE = function () {
            function NODE(title) {
                _classCallCheck(this, NODE);

                this.id = generateID();
                this.metadata = {
                    'title': title
                };
                this._children = [];
            }

            // Get children Method
            // =============================================================================


            _createClass(NODE, [{
                key: 'getChildren',
                value: function getChildren() {
                    var self = this;
                    var deferred = $q.defer();

                    deferred.resolve(self._children);

                    return deferred.promise;
                }

                // Add children Method
                // =============================================================================

            }, {
                key: 'addChildren',
                value: function addChildren(node) {
                    var deferred = $q.defer();
                    var self = this;

                    self._children.push(node);
                    deferred.resolve(self._children);

                    return deferred.promise;
                }
            }]);

            return NODE;
        }();

        // Generate uniq ID Helper Method
        // =============================================================================


        function generateID() {
            var d = new Date().getTime();
            var id;
            id = 'yxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            return id;
        }

        // =====================================================================================================================
        // =====================================================================================================================
        // =====================================================================================================================
        var self = this;
        self.rootTree = null;
        self.treeJSON = null;
        self.nodesSystem = [];

        // Load Tree from server
        // =====================================================================
        self.load = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getTree'
            }).then(function (res) {
                self.treeJSON = res.data.tree.rootNode;
                deferred.resolve(self.treeJSON);
            });
            return deferred.promise;
        };

        // Trees
        // =====================================================================
        self.trees = function () {

            //nodes from server
            var nodes = self.treeJSON;

            return {
                //Add Tree Method
                add: function add() {
                    var deferred = $q.defer();
                    var count = 1;

                    // Traversing nodes
                    function listItem(current, depth) {
                        var space = '';
                        var node, childNode;
                        var nodeTitle = current.metadata.title || '-';
                        // console.log(current);

                        // some space for visual
                        for (var j = 0; j < depth; j++) {
                            space = space + '  ';
                        }

                        //create node
                        node = new NODE(nodeTitle);
                        console.log(space + depth + '. ' + nodeTitle);
                        self.nodesSystem.push(node);

                        var children = current.children;
                        _.forEach(children, function (child) {
                            childNode = new NODE(child.metadata.title);
                            node.addChildren(childNode);
                            listItem(child, depth + 1);
                            count++;
                        });
                        // console.log(node);
                        // nodesSystem.push(node);
                    }

                    console.log(nodes);
                    // Loop through JSON nodes
                    listItem(nodes, 0);

                    console.log(self.nodesSystem);
                    console.log(self.nodesSystem.length);
                    deferred.resolve(self.nodesSystem);

                    return deferred.promise;
                },
                // Remove Tree Method
                remove: function remove() {
                    var deffered = $q.defer();

                    // May be it should be more complicated
                    self.rootTree = null;
                    deffered.resolve(self.rootTree);

                    return deffered.promise;
                }
            };
        };

        // Nodes
        // =====================================================================
        self.nodes = function () {

            return {
                //Add Node Method
                add: function add(nodeTitle) {
                    var node;
                    var deffered = $q.defer();

                    node = new NODE(nodeTitle);

                    self.nodesSystem.push(node);
                    deffered.resolve(node);

                    return deffered.promise;
                },
                //Delete Node Method
                delete: function _delete() {
                    var deffered = $q.defer();

                    // delete and resolve(void)

                    return deffered.promise;
                }
            };
        };
    };

    angular.module('app').service('treeviewService', ['$http', '$q', treeviewServiceFunc]);
})();