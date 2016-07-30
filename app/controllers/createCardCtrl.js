app.controller('createCardCtrl', ['$scope', 'CONST_VALIDATORS', function($scope, CONST_VALIDATORS) {
    var vm = this;

    //Sending some constants to view
    vm.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
    vm.minAge = CONST_VALIDATORS.AGE_MINIMUM;
    vm.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;

}]);