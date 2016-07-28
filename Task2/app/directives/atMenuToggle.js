app.directive('atMenuToggle', ['CONST_VALIDATORS', function (CONST_VALIDATORS) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
            var button = element;
            var menu = element.parent().next();

            button.bind('click', function(e) {
                var ariaExpanded = button.attr('aria-expanded');

                button.toggleClass('collapsed');
                menu.toggleClass('in');

                if (ariaExpanded === 'true') {
                    button.attr('aria-expanded', 'false');
                    menu.attr('aria-expanded', 'false');
                } else {
                    button.attr('aria-expanded', 'true');
                    menu.attr('aria-expanded', 'true');
                }
            });
        }
    };

}]);
