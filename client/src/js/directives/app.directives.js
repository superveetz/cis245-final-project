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
    
    .directive('scrollDisabled', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem) {

                elem.on('show.bs.offcanvas', function () {
                    let body = document.getElementsByTagName('body')[0];
                    let html = document.getElementsByTagName('html')[0];
                    let bodyElem = angular.element(body);
                    let htmlElem = angular.element(html);
                    
                    bodyElem.addClass('body-scroll-disabled');
                    htmlElem.addClass('html-scroll-disabled');
                    $timeout(() => {
                        bodyElem.ontouchmove = function(event){
                            event.preventDefault();
                        }
                    }, 300);
                });

                elem.on('hide.bs.offcanvas', function () {
                    let body = document.getElementsByTagName('body')[0];
                    let html = document.getElementsByTagName('html')[0];
                    let bodyElem = angular.element(body);
                    let htmlElem = angular.element(html);

                    $timeout(() => {
                        bodyElem.removeClass('body-scroll-disabled');
                        htmlElem.removeClass('html-scroll-disabled');
                        bodyElem.ontouchmove = function(event){
                            return true;
                        }
                    }, 300);
                });
            }
        };
    }]);
})(angular);