(function (angular) {
    // declare app and load dependencies
    angular.module('app', [
        'firebase',
        'ui.router',
        'ui.bootstrap',
        'ui.validate',
        'ngAnimate',
        'app.controllers',
        'app.directives',
        'app.services',
        'canvas-raining'
    ])

    .run(['$rootScope', '$state', '$window', '$firebaseAuth', '$location', '$anchorScroll', '$timeout', function ($rootScope, $state, $window, $firebaseAuth, $location, $anchorScroll, $timeout) {
        // attach $state static app data
        $rootScope.$state = $state;
        
        // store Current User static app data
        $rootScope.CurrentUser = undefined;
        
        // register an event that will listen for firebase authentication
        $firebaseAuth().$onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log(('signed in as: ', firebaseUser));
                $rootScope.CurrentUser = firebaseUser;
            } else {
                console.log('signed out');
                $rootScope.CurrentUser = undefined;
            }
        });

        // hook into onStateChangeStart event
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            // cancel state transition if 1 is occuring already
            // if ($rootScope.stateChangeOccuring) return e.preventDefault(); 

            // // disable any further state transitions
            // $rootScope.stateChangeOccuring = true;
        });

        // hook into onStateChangeSuccess event
        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            // scroll to top on page once state change transition starts
            // $location.hash(fromState.name);
            // $anchorScroll();
            // $location.hash('');
            

            // wait for transitition animation to end after 1s
            // $timeout(() => {
            //     // allow state changes
            //     $rootScope.stateChangeOccuring = false;
            // }, 700);
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
            controller: ['$rootScope', function ($rootScope) {
                console.log('gogogo!');
            }]
        })
        
        .state('app.home', {
            url: '/',
            templateUrl: '/views/home/index.html',
            controller: ['$window', function ($window) {
                console.log('go me');
                $window.scrollTo(0, 0);
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