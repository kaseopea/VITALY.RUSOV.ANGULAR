//Config for ui router
// =====================================================================================================================
(function () {
    var appConfigFunc = function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('auth', {
                abstract: true,
                templateUrl: 'app/auth/auth.tpl.html'
            })
            .state('login', {
                url: '/',
                parent: 'auth',
                templateUrl: 'app/auth/login/login.tpl.html',
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
                templateUrl: 'app/auth/forgot/forgot.tpl.html',
                controller: 'forgotCtrl',
                controllerAs: 'vm'
            })

// Dashboard
// =====================================================================================================================
            .state('dashboard', {
                abstract: true,
                resolve: {
                    userData: function (profileService) {
                        return profileService.checkUserSession().then(function(res){
                            return res.data;
                        });
                    }
                },
                data: {
                    secure: true
                },
                templateUrl: 'app/dashboard/dashboard.tpl.html',
                controller: 'dashboardCtrl',
                controllerAs: 'dashboard'
            })

// Profile Pages
// =====================================================================================================================
            .state('profile', {
                abstract: true,
                parent: 'dashboard',
                url: '/profile',
                templateUrl: 'app/dashboard/profile/profile.tpl.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .state('viewProfile', {
                url: '/view',
                parent: 'profile',
                templateUrl: 'app/dashboard/profile/view/profileView.tpl.html',
                controller: 'profileViewCtrl',
                controllerAs: 'vm'
            })
            .state('editProfile', {
                url: '/edit',
                parent: 'profile',
                templateUrl: 'app/dashboard/profile/edit/profileEdit.tpl.html',
                controller: 'profileEditCtrl',
                controllerAs: 'vm'
            });
    };

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', appConfigFunc]);

})();