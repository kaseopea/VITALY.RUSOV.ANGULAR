//Config for ui router
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            views: {
                header: {
                    templateUrl: 'app/tpl/header.tpl.html'
                },
                content: {
                    template: '<div ui-view></div>'
                },
                footer: {
                    templateUrl: 'app/tpl/footer.tpl.html'
                }
            }
        })
        .state('home', {
            url: '/',
            parent: 'root',
            templateUrl: 'app/tpl/index.tpl.html'
        })
        .state('createcard', {
            url: '/create',
            parent: 'root',
            templateUrl: 'app/tpl/createCard.tpl.html',
            controller: 'createCardCtrl',
            controllerAs: 'vm'
        });
}]);
