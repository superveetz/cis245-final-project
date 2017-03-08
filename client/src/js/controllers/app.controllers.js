(function (angular) {
    angular.module('app.controllers', [
    ])

    .controller('MainNavCtrl', ['$rootScope', '$scope', '$firebaseAuth', '$http', '$window', '$state', '$timeout', 'ModalService', 'AlertService', function ($rootScope, $scope, $firebaseAuth, $http, $window, $state, $timeout, ModalService, AlertService) {
        // init $scope
        $scope.authObj = $firebaseAuth();
        
        // open register account modal
        $scope.openRegisterAccountModal = function (closeMobileNav) {
            AlertService.reset();

            if (closeMobileNav) {
                $scope.closeMobileSideNav();
                // wait for mobile side nav to close, then open modal
                $timeout(() => {
                    ModalService.openRegisterAccountModal();
                }, 300);
            } else {
                ModalService.openRegisterAccountModal();
            }
        };

        // open login modal
        $scope.openLoginModal = function (closeMobileNav) {
            AlertService.reset();
            
            if (closeMobileNav) {
                $scope.closeMobileSideNav();
                // wait for mobile side nav to close, then open modal
                $timeout(() => {
                    ModalService.openLoginModal();
                }, 300);
            } else {
                ModalService.openLoginModal();
            }
        };

        // toggle mobile getting started
        $scope.showGettingStarted = false;
        $scope.toggleGettingStarted = function () {
            $scope.showGettingStarted = !$scope.showGettingStarted;
            return true;
        };

        // toggle mobile account options
        $scope.showAccountOptions = false;
        $scope.toggleAccountOptions = function () {
            $scope.showAccountOptions = !$scope.showAccountOptions;
            return true;
        };

        // logout
        $scope.logOut = function () {
            $scope.authObj.$signOut();
            return true;
        };

        // close mobile side nav
        $scope.closeMobileSideNav = function () {
            // using jasny bootstrap jquery api
            $('#mobile-side-nav').offcanvas('hide');
            return true;
        };

    }])
    
    .controller('LoginCtrl', ['$rootScope', '$firebaseAuth', '$scope', '$http', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $firebaseAuth, $scope, $http, $window, $uibModalInstance, AlertService, AuthService) {
        // defaults
        const dNewUser = {
            email: '',
            pass: '',
            cPass: ''
        };

        const dExistingUser = {
            email: '',
            pass: ''
        };

        const dServerResponse = {
            loginErr: false,
            signUpErr: false
        };

        // init $scope
        $scope.serverResponse   = angular.copy(dServerResponse);
        $scope.authObj          = $firebaseAuth();
        $scope.newUser          = angular.copy(dNewUser);
        $scope.existingUser     = angular.copy(dNewUser);
        
        // submit sign up form
        $scope.submitSignUpForm = function () {
            // turn on loading spinner
            $scope.signUpSubmit = true;

            // make authentication request to our firebase api
            $scope.authObj.$createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.pass)
            .then(response => {
                // success
                $scope.signUpSubmit = false;
                $scope.closeModal();
            })
            .catch(err => {
                // error
                $scope.signUpSubmit = false;
                AlertService.setAlert({  
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // submit log in form
        $scope.submitLoginForm = function () {
            // turn on loading spinner
            $scope.loginSubmit = true;

            // login with email and password
            $scope.authObj.$signInWithEmailAndPassword($scope.existingUser.email, $scope.existingUser.pass)
            .then(response => {
                // success
                $scope.loginSubmit = false;
                $scope.closeModal();
            })
            .catch(err => {
                // error
                $scope.loginSubmit = false;
                AlertService.setAlert({  
                    show: true,
                    type: 'error',
                    title: err.message
                });
            });
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // validate confirm password matches password
        $scope.isPassConfirmed = function (confirmPass) {
            return confirmPass.signUpForm.newUserPass.$$rawModelValue === confirmPass.signUpForm.newUserCPass.$$rawModelValue;
        };
    }]);
})(angular);