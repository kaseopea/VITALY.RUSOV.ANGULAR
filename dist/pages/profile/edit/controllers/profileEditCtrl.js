'use strict';

// Edit Profile Controller
// =====================================================================================================================

(function () {

    var profileEditCtrlFunc = function profileEditCtrlFunc(CONST_VALIDATORS, $scope, $http, $rootScope, $state, toastService, userData, profileService) {

        this.user = angular.fromJson(userData.user);

        //Sending some constants to view
        this.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
        this.minAge = CONST_VALIDATORS.AGE_MINIMUM;
        this.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;
        this.bioMaxLength = CONST_VALIDATORS.MAX_BIO_LENGTH;

        //setting current tab
        $rootScope.currentNavItem = $state.current.name;

        //Profile Update form
        this.submitProfileUpdateForm = function () {

            profileService.updateUserProfile(this.user).then(function (data) {
                $state.go('viewProfile');
            });
        };
    };

    angular.module('app.profile').controller('profileEditCtrl', ['CONST_VALIDATORS', '$scope', '$http', '$rootScope', '$state', 'toastService', 'userData', 'profileService', profileEditCtrlFunc]);
})();