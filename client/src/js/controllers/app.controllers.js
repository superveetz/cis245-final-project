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
    
    .controller('RegisterAccountCtrl', ['$rootScope', '$firebaseAuth', '$scope', '$http', '$timeout', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $firebaseAuth, $scope, $http, $timeout, $window, $uibModalInstance, AlertService) {
        

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

            // make authentication request to our firebase api
            firebase.auth()
            .createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.pass)
            .then(response => {
                // success
                $scope.signupSubmit = false;
                $timeout(() => {
                    $rootScope.CurrentUser = response.data;
                    $scope.closeModal();
                });
            })
            .catch(err => {
                // error
                $scope.signupSubmit = false;
                $timeout(() => {
                    AlertService.setAlert({  
                        show: true,
                        type: 'error',
                        title: err.message
                    });
                });
            });
            // make POST request
            // $http({
            //     method: 'POST',
            //     url: '/api/users/register-new',
            //     data: $scope.newUser
            // })
            // .then(response => {
            //     // success
            //     $scope.signupSubmit = false;
            //     $rootScope.CurrentUser = response.data;
            //     $scope.closeModal();
            // })
            // .catch(err => {
            //     // error
            //     $scope.signupSubmit = false;
            //     AlertService.setAlert({
            //         show: true,
            //         type: 'error',
            //         title: err,
            //         slimErr: err.data ? err : undefined
            //     });
            // });
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
    
    .controller('LoginCtrl', ['$rootScope', '$firebaseAuth', '$scope', '$http', '$window', '$uibModalInstance', 'AlertService', function ($rootScope, $firebaseAuth, $scope, $http, $window, $uibModalInstance, AlertService, AuthService) {
        // defaults
        const dExistingUser = {
            usernameOrEmail: '',
            pass: ''
        };

        const dServerResponse = {
            loginErr: false,
            registerErr: false
        };
        
        // init defaults
        $scope.existingUser     = angular.copy(dExistingUser);
        $scope.serverResponse   = angular.copy(dServerResponse);

        // submit log in form
        $scope.submitLoginForm = function () {
            // turn on loading spinner
            $scope.loginSubmit = true;

            var auth = $firebaseAuth();

            // login with Facebook
            auth.$signInWithPopup("google")
            .then(firebaseUser => {
                // success
                $scope.loginSubmit = false;
                $rootScope.CurrentUser = firebaseUser.user;
                $scope.closeModal();
            })
            .catch(err => {
                console.log("err:", err);
                
                AlertService.setAlert({
                    show: true,
                    type: 'error',
                    title: 'error!'
                });
            });

            // $http({
            //     method: 'POST',
            //     url: '/api/users/login',
            //     data: $scope.existingUser
            // })
            // .then(response => {
            //     // success
            //     $scope.loginSubmit = false;
            //     $rootScope.CurrentUser = response.data;
            //     $scope.closeModal();
            // })
            // .catch(err => {
            //     // error
            //     $scope.loginSubmit = false;
            //     $scope.serverResponse.loginErr = true;
            //     AlertService.setAlert({
            //         show: true,
            //         type: 'error',
            //         title: err,
            //         slimErr: err.data ? err : undefined
            //     });
            // });
        };

        // close modal
        $scope.closeModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
})(angular);