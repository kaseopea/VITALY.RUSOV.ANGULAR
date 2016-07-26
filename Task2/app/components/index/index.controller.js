app.controller('indexCtrl', ['$scope', 'CONST_VALIDATORS', function($scope, CONST_VALIDATORS) {
    //Sending some constants to view
    this.nameMaxWords = CONST_VALIDATORS.MAX_WORDS_IN_NAME;
    this.minAge = CONST_VALIDATORS.AGE_MINIMUM;
    this.maxAge = CONST_VALIDATORS.AGE_MAXIMUM;
}]);