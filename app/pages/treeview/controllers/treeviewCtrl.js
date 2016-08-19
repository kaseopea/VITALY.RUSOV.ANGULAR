// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function ($scope, treeviewService) {
        var vm = this;

        var treeView = treeviewService.load()
            .then(function (tree) {
                treeviewService.trees().add().then(nodes=> {
                    console.log('starting nodes');
                    console.log(nodes.join('\n'));
                });

            });

        // var trees = treeviewService.trees().add('Root Tree');
        // trees.then(function (tree) {
        //
        //     // here we should have complete tree and pass it to view
        //     // console.log(tree);
        //     // vm.tree = tree;
        // });


    };


    angular.module('app').controller('treeviewCtrl', ['$scope', 'treeviewService', treeviewCtrlFunc]);

})();