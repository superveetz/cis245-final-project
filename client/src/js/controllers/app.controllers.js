(function (angular) {
    angular.module('app.controllers', [
    ])

    .controller('MainNavCtrl', ['$rootScope', '$scope', '$http', '$window', '$state', '$timeout', 'ModalService', 'AlertService', function ($rootScope, $scope, $http, $window, $state, $timeout, ModalService, AlertService) {
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
            $rootScope.CurrentUser = undefined;
            return true;
        };

        // close mobile side nav
        $scope.closeMobileSideNav = function () {
            // using jasny bootstrap jquery api
            $('#mobile-side-nav').offcanvas('hide');
            return true;
        };

    }])
    
    .controller('RegisterAccountCtrl', ['$rootScope', '$scope', '$http', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $scope, $http, $window, $uibModalInstance, AlertService) {
        // defaults
        const dNewUser = {
            username: '',
            email: '',
            pass: '',
            cPass: ''
        };
        
        // init defaults
        $scope.newUser      = angular.copy(dNewUser);

        // submit sign up form
        $scope.submitSignUpForm = function () {
            // turn on loading spinner
            $scope.signupSubmit = true;

            // make POST request
            $http({
                method: 'POST',
                url: '/api/users/register-new',
                data: $scope.newUser
            })
            .then(response => {
                // success
                $scope.signupSubmit = false;
                $rootScope.CurrentUser = response.data;
                $scope.closeModal();
            })
            .catch(err => {
                // error
                $scope.signupSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err,
                    slimErr: err.data ? err : undefined
                });
            });
        };

        // validate confirm password matches password
        $scope.isPassConfirmed = function (confirmPass) {
            return confirmPass.signUpForm.userPass.$$rawModelValue === confirmPass.signUpForm.userConfirmPass.$$rawModelValue;
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }])
    
    .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $scope, $http, $window, $uibModalInstance, AlertService) {
        // defaults
        const dExistingUser = {
            usernameOrEmail: '',
            pass: ''
        };
        
        // init defaults
        $scope.existingUser     = angular.copy(dExistingUser);

        // submit log in form
        $scope.submitLoginForm = function () {
            // turn on loading spinner
            $scope.loginSubmit = true;

            $http({
                method: 'POST',
                url: '/api/users/login',
                data: $scope.existingUser
            })
            .then(response => {
                // success
                $scope.loginSubmit = false;
                $rootScope.CurrentUser = response.data;
                $scope.closeModal();
            })
            .catch(err => {
                // error
                $scope.loginSubmit = false;
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: err,
                    slimErr: err.data ? err : undefined
                });
            });
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})(angular);