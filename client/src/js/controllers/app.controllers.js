(function (angular) {
    angular.module('app.controllers', [])
    
    .controller('MainNavCtrl', ['$rootScope', '$scope', '$http', '$window', '$state', 'ModalService', 'AlertService', function ($rootScope, $scope, $http, $window, $state, ModalService, AlertService) {
        // open register account modal
        $scope.openRegisterAccountModal = function () {
            AlertService.reset();
            ModalService.openRegisterAccountModal();
        };

        // open login modal
        $scope.openLoginModal = function () {
            AlertService.reset();
            ModalService.openLoginModal();
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
            // separate form submission into sequential steps
            $scope.signupSubmit = true;
            async.series([
                 (seriesCB) => {
                    // validate form
                    if (!$scope.newUser.username)                        return seriesCB('Username is required');
                    else if (!$scope.newUser.email)                      return seriesCB('Email is required');
                    else if ($scope.newUser.email.indexOf('@') === -1 ||
                             $scope.newUser.email.indexOf('.') === -1 ||
                             $scope.newUser.email.indexOf('.') - $scope.newUser.email.indexOf('@') === 1 ||
                             $scope.newUser.email.length-1 === $scope.newUser.email.indexOf('.')) 
                                return seriesCB('Email is an invalid format');
                    
                    else if ($scope.newUser.pass !== $scope.newUser.cPass)      return seriesCB('Passord and confirm password fields do not match');
                    else if ($scope.newUser.pass.length < 8)                    return seriesCB('Password must be at least 8 characters long');
                    else 
                        return seriesCB();

                },
                 (seriesCB) => {
                    // POST submit
                    $http({
                        method: 'POST',
                        url: '/api/users/register-new',
                        data: $scope.newUser
                    })
                    .then(response => {
                        // store authenticated user data
                        $rootScope.CurrentUser = response.data;
                        return seriesCB();
                    })
                    .catch(err => {
                        return seriesCB(err);
                    });
                }
            ], (err) => {
                $scope.signupSubmit = false;
                
                if (err) {
                    AlertService.setAlert({
                        show: true,
                        type: 'error',
                        title: err,
                        slimErr: err.data ? err : undefined
                    });
                } else {
                    $window.scrollTo(0, 0);
                    $scope.closeModal();
                }
            });
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
        $scope.AlertService     = AlertService;

        // submit log in form
        $scope.submitLoginForm = function () {
            $scope.loginSubmit = true;
            
            async.series([
                (seriesCB) => {
                    // validate form
                    if (!$scope.existingUser.usernameOrEmail)    return seriesCB('Username or email is required');
                    else if (!$scope.existingUser.pass)          return seriesCB('Password is required');
                    else 
                        return seriesCB();
                },
                (seriesCB) => {
                    // POST login request
                    $http({
                        method: 'POST',
                        url: '/api/users/login',
                        data: $scope.existingUser
                    })
                    .then(response => {
                        // store authenticated user data
                        $rootScope.CurrentUser = response.data;
                        return seriesCB();
                    })
                    .catch(err => {
                        return seriesCB(err);
                    });
                }
            ], (err) => {
                $scope.loginSubmit = false;

                if (err) {
                    AlertService.setAlert({
                        show: true,
                        type: 'error',
                        title: err,
                        slimErr: err.data ? err : undefined
                    });
                } else {
                    $window.scrollTo(0, 0);
                    $scope.closeModal();
                }
            });
            
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})(angular);