ChatApp.controller('appCtrl', ['$scope', '$rootScope', '$http', '$state', '$sessionStorage', '$filter', '$mdToast', '$mdMenu', 'CONFIG', function ($scope, $rootScope, $http, $state, $sessionStorage, $filter, $mdToast, $mdMenu, CONFIG) {
    $scope.selected = 'dashboard';
    $scope.showLoginArea = false;
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


    /*Image Capture From WebCam*/

    var _video = null,
        patData = null;

    $scope.showDemos = false;
    $scope.edgeDetection = false;
    $scope.mono = false;
    $scope.invert = false;

    $scope.patOpts = {
        x: 0,
        y: 0,
        w: 25,
        h: 25
    };

    /* $scope.myChannel = {
         videoHeight: 240,
         videoWidth: 320,
         video: null // Will reference the video element on success
     };*/

    $scope.channel = {
        videoHeight: 240,
        videoWidth: 320,
        video: null // Will reference the video element on success
    };

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function () {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function () {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            $scope.showDemos = true;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
    };

    $scope.makeSnapshot = function makeSnapshot() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;
        }
    };

    $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
        window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.snapshotData = imgBase64;
    };

}]);
