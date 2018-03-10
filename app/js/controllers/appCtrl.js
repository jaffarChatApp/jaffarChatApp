ChatApp.controller('appCtrl', ['$scope', '$rootScope', '$http', '$state', '$sessionStorage', '$filter', '$mdToast', '$mdMenu', 'CONFIG', function ($scope, $rootScope, $http, $state, $sessionStorage, $filter, $mdToast, $mdMenu, CONFIG) {
    $scope.selected = 'dashboard';
    $scope.showLoginArea = true;
    $scope.toggleList = function () {
        $mdSidenav('left').toggle();
    };

    $scope.openMenu = function (ev) {
        $mdMenu.open(ev);
    };

    $scope.register = {
        "name": "",
        "email": "",
        "mobile": "",
        "registeredDate": new Date()
    }

    $scope.lodinData = {
        "password": "",
        "email": "",
        "loginDate": new Date()
    }

    /*Registration*/
    $scope.submitForm = function () {
        $scope.loading = true;
        $scope.register.registeredDate = $filter('date')($scope.register.registeredDate, 'yyyy-MM-dd HH:mm:ss');
        $http({
            method: 'POST',
            url: CONFIG.rootUrl + 'registerUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.register
        }).then(function (response) {
            $scope.loading = false;
            if (response.data.success == true) {
                $sessionStorage.userData = response.data.userData[0];
                $scope.msgContent = "Registeration successfully.";
                $scope.toasterClass = "successClass";
                $scope.showAlertMessage();
                $state.go('home.dashboard');
            } else {
                $scope.msgContent = "Registeration failed.";
                $scope.toasterClass = "warningClass";
                $scope.showAlertMessage();
            }
        });
    }

    /*Login*/
    $scope.login = function () {
        if ($scope.register.email != "") {
            $scope.checkUserExist('login');
        } else {
            $scope.msgContent = "Please input email address.";
            $scope.toasterClass = "warningClass";
            $scope.showAlertMessage();
        }
    }

    /*Check User Exist*/
    $scope.checkUserExist = function (event) {
        $scope.loading = true;
        var checkUser = {
            email: $scope.register.email
        };
        $http({
            method: 'POST',
            url: CONFIG.rootUrl + 'checkUserExist',
            headers: {
                'Content-Type': 'application/json'
            },
            data: checkUser
        }).then(function (response) {
            $scope.loading = false;
            if (response.data.success == true) {
                $sessionStorage.userData = response.data.userData[0];
                if (event == 'login') {
                    $state.go('home.dashboard');
                    $scope.msgContent = "Login successfully.";
                    $scope.toasterClass = "successClass";
                } else {
                    $scope.msgContent = "Your email id is registered with us, please login to continue.";
                    $scope.toasterClass = "warningClass";
                }
                $scope.showAlertMessage();
            } else {
                if (event == 'login') {
                    $scope.msgContent = "Your email is id not registeration with us, please register and continue.";
                    $scope.toasterClass = "errorClass";
                    $scope.showAlertMessage();
                }
            }
        });
    }

    /*View Change*/
    $scope.showView = function (view) {
        if (view == 'register') {
            $scope.showLoginArea = false;
            $scope.showRegisterArea = true;
        } else {
            $scope.showRegisterArea = false;
            $scope.showLoginArea = true;
        }
    }

    /*Alert Message*/
    $scope.showAlertMessage = function () {
        $mdToast.show(
            $mdToast.simple()
            .textContent($scope.msgContent)
            .position('top left')
            .hideDelay(3000)
            .toastClass($scope.toasterClass)
        );
    }

    /*Get Login User Data*/
    $scope.getUserData = function (page) {
        if (page == 'chat') {
            $scope.showMenuIcon = false;
            $scope.showBackIcon = true;

        } else {
            $scope.showBackIcon = false;
            $scope.showMenuIcon = true;
        }
        $scope.userData = $sessionStorage.userData;
    }

    /*Logout*/
    $scope.logout = function () {
        $state.go('login');
        $sessionStorage.$reset();
    }

    /*Back Menu*/
    $scope.goBack = function () {
        $state.go('home.dashboard');
    }

    /*Get Page Title*/
    $rootScope.pageTitle = function () {
        $scope.title = $state.current.title;
        return ($scope.title);
    };
}]);
