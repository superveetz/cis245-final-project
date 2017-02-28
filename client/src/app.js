(function (angular) {
    // declare app and load dependencies
    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ui.validate',
        'ngAnimate',
        'app.controllers',
        'app.directives',
        'app.services'
    ])

    .run(['$rootScope', '$state', '$window', function ($rootScope, $state, $window) {
        // attach $state static app data
        $rootScope.$state = $state;
        
        // store Current User static app data
        $rootScope.CurrentUser = undefined;

        // hook into onStateChangeStart event
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            // scroll to top of page
            $window.scrollTo(0, 0);
        });
    }])

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // enable html5 mode (otherwise angularjs hashes urls with `#/#!/{config}`)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        // forced client routing sends to 404 for any unrecognized url
        $urlRouterProvider.otherwise('404');
        
        // declare all app states
        // TODO: add dynamic SEO
        $stateProvider
        .state('app', {
            abstract: true,
            url: '',
            templateUrl: '/views/index.html',
            controller: [function () {
                console.log('gogogo!');
            }]
        })
        
        .state('app.home', {
            url: '/',
            templateUrl: '/views/home/index.html',
            controller: [function () {
                console.log('go me');
            }]
        })
        
        .state('app.about', {
            url: '/about',
            templateUrl: '/views/about/index.html'
        })

        .state('app.services', {
            url: '/services',
            templateUrl: '/views/services/index.html'
        })
        
        .state('app.contact', {
            url: '/contact',
            templateUrl: '/views/contact/index.html'
        })
        .state('404', {
            url: '/404',
            templateUrl: '/views/404/index.html'
        });
    }]);
})(angular);