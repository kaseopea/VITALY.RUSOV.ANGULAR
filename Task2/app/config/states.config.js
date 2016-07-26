//Config for ui router
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
        url: '/',
        templateUrl: 'app/views/index.tpl.html',
        controller: 'indexCtrl',
        controllerAs: 'vm'
    })
        .state('createcard', {
        url: 'create',
        parent: 'index',
        templateUrl: 'app/views/createCard.tpl.html',
        controller: 'createCardCtrl',
        controllerAs: 'vm'
    });

}]);