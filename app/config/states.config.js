//Config for ui router
// =====================================================================================================================
(function () {
    var appConfigFunc = function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('auth', {
                abstract: true,
                templateUrl: 'app/pages/auth/tpl/auth.tpl.html'
            })
            .state('login', {
                url: '/',
                parent: 'auth',
                templateUrl: 'app/pages/auth/login/tpl/login.tpl.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout',
                parent: 'auth',
                controller: 'logoutCtrl'
            })
            .state('forgot', {
                url: '/reset',
                parent: 'auth',
                templateUrl: 'app/pages/auth/forgot/tpl/forgot.tpl.html',
                controller: 'forgotCtrl',
                controllerAs: 'vm'
            })

            // Dashboard
            // =========================================================================================================
            .state('dashboard', {
                abstract: true,
                resolve: {
                    userData: function (profileService) {
                        return profileService.checkUserSession().then(function (res) {
                            return res.data;
                        });
                    }
                },
                data: {
                    secure: true
                },
                templateUrl: 'app/pages/dashboard/tpl/dashboard.tpl.html',
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard'
            })

            // Treeview Pages
            // =========================================================================================================
            // .state('treeview', {
            //     parent: 'dashboard',
            //     url: '/treeview',
            //     templateUrl: 'app/pages/treeview/tpl/treeview.tpl.html',
            //     controller: 'treeviewCtrl',
            //     controllerAs: 'vm'
            // })

            // Profile Pages
            // =========================================================================================================
            .state('profile', {
                abstract: true,
                parent: 'dashboard',
                url: '/profile',
                templateUrl: 'app/pages/profile/tpl/profile.tpl.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .state('viewProfile', {
                url: '/view',
                parent: 'profile',
                templateUrl: 'app/pages/profile/view/tpl/profileView.tpl.html',
                controller: 'profileViewCtrl',
                controllerAs: 'vm'
            })
            .state('editProfile', {
                url: '/edit',
                parent: 'profile',
                templateUrl: 'app/pages/profile/edit/tpl/profileEdit.tpl.html',
                controller: 'profileEditCtrl',
                controllerAs: 'vm'
            })

            // Action Button Test Component
            // =========================================================================================================
            .state('actionTest', {
                parent: 'dashboard',
                url: '/actiontest',
                templateUrl: 'app/pages/actiontest/tpl/actiontest.tpl.html',
                controller: 'actionTestCtrl',
                controllerAs: 'vm'
            });
    };

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', appConfigFunc]);

})();