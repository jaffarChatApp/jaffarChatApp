ChatApp.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$state', '$sessionStorage', '$stateParams', '$timeout', 'CONFIG', function ($scope, $rootScope, $http, $state, $sessionStorage, $stateParams, $timeout, CONFIG) {
    $scope.getUserData('dashboard');
    //$scope.userData = $sessionStorage.userData;
    $scope.getUserList = function () {
        var getData = {
            userId: $sessionStorage.userData.userId
        }
        $http({
            //method: 'POST',
            method: 'GET',
            url: CONFIG.rootUrl + 'getUserlist',
            headers: {
                'Content-Type': 'application/json'
            }
            //data: getData
        }).then(function (response) {
            if (response.data.success == true) {
                if (response.data.userData.length > 0) {
                    $scope.userList = response.data.userData;
                }
            }
        });
    }

    $scope.getUserList();

    $scope.messageView = function (item) {
        console.log("item", item);
        $sessionStorage.recieverData = item;
        $state.go('home.chatView', {
            fromUserId: $scope.userData.userId,
            toUserId: item.userId
        });
    }

    $scope.notifyUser = function () {
        OneSignal.push(function () {
            OneSignal.init({
                appId: "fe9010f6-0bb3-464a-9e55-6aab21b2f944",
                autoRegister: true,
                notifyButton: {
                    enable: false,
                },
                welcomeNotification: {
                    "title": "My Custom Title",
                    "message": "Thanks for subscribing!",
                },
                promptOptions: {
                    /* actionMessage limited to 90 characters */
                    actionMessage: "We'd like to show you notifications for the latest news and updates.",
                    /* acceptButtonText limited to 15 characters */
                    acceptButtonText: "ALLOW",
                    /* cancelButtonText limited to 15 characters */
                    cancelButtonText: "NO THANKS"
                }
            });
        });
        OneSignal.push(function () {
            OneSignal.showHttpPrompt();
        });
    }
    $timeout(function () {
        console.log("ONESIGNAL_HTTP_PROMPT_SHOWN", $sessionStorage.ONESIGNAL_HTTP_PROMPT_SHOWN);
        $scope.notifyUser();
    }, 100);



}]);
