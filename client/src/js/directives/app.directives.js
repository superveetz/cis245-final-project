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
    
    .directive('scrollDisabled', ['$window', '$timeout', function ($window, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem) {

                let window = angular.element($window);
                
                elem.on('show.bs.offcanvas', function () {
                    let body = document.getElementsByTagName('body')[0];
                    let html = document.getElementsByTagName('html')[0];
                    let app  = document.getElementById('app');
                    let bodyElem = angular.element(body);
                    let htmlElem = angular.element(html);
                    let appElem  = angular.element(app);
                    
                    bodyElem.addClass('body-scroll-disabled');
                    htmlElem.addClass('html-scroll-disabled');
                    $timeout(() => {
                        bodyElem.ontouchmove = function(event) {
                            event.preventDefault();
                        }
                        app.ontouchmove = function(event) {
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
                        window.scrollTop(400);
                        bodyElem.removeClass('body-scroll-disabled');
                        htmlElem.removeClass('html-scroll-disabled');
                        bodyElem.ontouchmove = function(event) {
                            return true;
                        }
                        app.ontouchmove = function(event) {
                            return true;
                        }
                    }, 300);
                });
            }
        };
    }])
    
    // used to bind forms where type="email" as 2 forms with same ng-model bind only seem to bind when changed to type="text"
    .directive('lateEmail', function () {
        return {
            priority: -1,
            link: function(scope, elem, attrs) {
                elem.attr('type', 'email');
            }
        };
    });;
})(angular);