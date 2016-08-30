// Tree View Controller
// =====================================================================================================================
(function () {

    var treeViewCtrlFunc = function ($scope, $http, $timeout, $q, treeViewFactory) {
        var vm = this;
        vm.nodes = [];

        // Get Tree From server
        $http.get('/api/getTree')
            .then(function (res) {
                var inputTree = res.data.tree;
                var inputRootNode = inputTree.rootNode;
                var rootNode = new treeViewFactory.atNODE(inputRootNode);
                var map = {};
                var counter = 0;

                treeViewFactory.trees.add(rootNode).then(function (root) {

                    //add to root node
                    vm.nodes.push({
                        title: root.metadata.title,
                        children: []
                    });
                    map[root.id] = counter++;

                    function addRecursive(parent, children) {

                        _.forEach(children, (child) => {
                            treeViewFactory.nodes.add(new treeViewFactory.atNODE(child)).then((node) => {
                                parent.addChildren(node.id)
                                    .then(() => {

                                        // console.log('NODE ', node);
                                        // console.log('map ', map);
                                        // console.log('parent.id ', parent.id);
                                        // console.log('map[parent.id] ', map[parent.id]);
                                        // console.log('vm.nodes[map[parent.id]] ', vm.nodes[map[parent.id]]);
                                        // console.log('vm.nodes ', vm.nodes);
                                        // map[node.id] = counter++;
                                        // vm.nodes[map[parent.id]].children.push({
                                        //     title: node.metadata.title,
                                        //     children: []
                                        // });
                                        // console.log('vm.nodes ', vm.nodes);
                                        // console.log(parent.metadata.title);
                                        // console.log(node);

                                        // console.log('\n\n');
                                        addRecursive(node, child.children);
                                    });
                            });
                        });
                    }

                    addRecursive(root, inputRootNode.children);

                });

            });
    };

    angular.module('app').controller('treeViewCtrl', ['$scope', '$http', '$timeout', '$q', 'treeViewFactory', treeViewCtrlFunc]);

})();