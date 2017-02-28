(function (angular) {
    angular.module('app.directives', [
        'app.controllers'
    ])
    
    .directive('mainNav', [function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/directives/templates/main-nav/main-nav.html',
            controller: 'MainNavCtrl'
        };
    }])
    
    .directive('alertBox', ['AlertService', function (AlertService) {
        return {
            restrict: 'E',
            templateUrl: function (scope, elem) {
                // Use default theme if no theme is provided
                if (elem.theme) {
                return '/js/directives/templates/alert-box/' + elem.theme + '.html'
                } else {
                return '/js/directives/templates/alert-box/default.html'
                }
            },
            link: function (scope) {
                scope.AlertService = AlertService;
            }
        };
    }])
    
    .directive('scrollDisabled', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem) {

                elem.on('show.bs.offcanvas', function () {
                    elem.addClass('scroll-disabled');
                    document.ontouchmove = function(event){
                        event.preventDefault();
                    }
                });

                elem.on('hide.bs.offcanvas', function () {
                    elem.removeClass('scroll-disabled');
                    document.ontouchmove = function(event){
                        return true;
                    }
                });
            }
        };
    }]);
})(angular);