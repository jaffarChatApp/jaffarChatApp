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
        $sessionStorage.recieverData = item;
        $state.go('home.chatView', {
            fromUserId: $scope.userData.userId,
            toUserId: item.userId
        });
    }

    $scope.notifyUser = function () {

        OneSignal.push(function () {
            OneSignal.showHttpPrompt();
        });
    }
    $timeout(function () {
        console.log("ONESIGNAL_HTTP_PROMPT_SHOWN", $sessionStorage.ONESIGNAL_HTTP_PROMPT_SHOWN);
        $scope.notifyUser();
    }, 100);



}]);
