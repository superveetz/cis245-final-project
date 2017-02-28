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
                    var body = document.getElementsByTagName('body')[0];
                    var html = document.getElementsByTagName('html')[0];
                    console.log("body:", body);
                    console.log("html:", html);
                    
                    var bodyElem = angular.element(body);
                    var htmlElem = angular.element(html);
                    console.log("bodyElem:", bodyElem);
                    console.log("htmlElem:", htmlElem);
                    
                    bodyElem.addClass('body-scroll-disabled');
                    htmlElem.addClass('html-scroll-disabled');
                    // document.ontouchmove = function(event){
                    //     event.preventDefault();
                    // }
                });

                elem.on('hide.bs.offcanvas', function () {
                    var body = document.body;
                    var html = document.html;
                    var bodyElem = angular.element(body);
                    var htmlElem = angular.element(html);
                    bodyElem.removeClass('body-scroll-disabled');
                    htmlElem.removeClass('htmlElem');
                    // document.ontouchmove = function(event){
                    //     return true;
                    // }
                });
            }
        };
    }]);
})(angular);