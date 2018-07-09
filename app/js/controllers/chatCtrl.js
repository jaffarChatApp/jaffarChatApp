ChatApp.controller('chatCtrl', ['$scope', '$rootScope', '$http', '$state', '$sessionStorage', '$stateParams', '$interval', '$timeout', '$mdToast', '$anchorScroll', 'CONFIG', function ($scope, $rootScope, $http, $state, $sessionStorage, $stateParams, $interval, $timeout, $mdToast, $anchorScroll, CONFIG) {
    /*Get Login UserData*/
    $scope.getUserData('chat');

    /*Variable Declarations*/
    $scope.messageData = {
        message: "",
        fromUser: $stateParams.fromUserId,
        toUser: $stateParams.toUserId,
        senderName: $sessionStorage.userData.name,
        recieverName: $sessionStorage.recieverData.name,
        postedDate: new Date()
    }

    /*Get User Chats*/
    $scope.getChatList = function (event) {
        $scope.loading = true;
        var getChats = {
            fromUser: $stateParams.fromUserId,
            toUser: $stateParams.toUserId
        }

        $http({
            method: 'POST',
            url: CONFIG.rootUrl + 'getChatList',
            headers: {
                'Content-Type': 'application/json'
            },
            data: getChats
        }).then(function (response) {
            $scope.loading = false;
            if (response.data.success == true) {
                if (response.data.chats.length > 0) {
                    $scope.chatList = response.data.chats;
                    var lastIndex = $scope.chatList.length - 1;
                    var scrollTo = $scope.chatList[lastIndex];
                    $timeout(function () {
                        $anchorScroll(scrollTo.msgId);
                    }, 200);
                }
            } else {
                $scope.msgContent = "You have'nt sent any message to this person yet.";
                $scope.toasterClass = "warningClass";
                $scope.showAlertMessage();
            }
        });
    }
    $scope.getChatList();


    /*Send Message*/
    $scope.sendMessage = function (event) {
        var message = $scope.messageData;
        $http({
            method: 'POST',
            url: CONFIG.rootUrl + 'senMessage',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.messageData
        }).then(function (response) {
            if (response.data.success == true) {
                $scope.sendNotification(event, message);
                $scope.messageData.message = "";
            }
        });
    }

    $scope.sendNotification = function (event, message) {
        //var url = "https://jaffarchatapp.github.io/jaffarChatApp/#!/home/chat/25sl29juhjxbima/vsncvm18d71z1x6"
        var sendData = {
            "app_id": CONFIG.app_id,
            "contents": {
                "en": message.message
            },
            "included_segments": ["Active Users", "Inactive Users"],
            "url": "https://jaffarchatapp.github.io/jaffarChatApp/#!/home/chat/25sl29juhjxbima/vsncvm18d71z1x6"
            //"included_segments": ["All"]
        }
        $http({
            method: 'POST',
            url: CONFIG.notifyUrl,
            headers: {
                'Authorization': CONFIG.REST_API_KEY,
                'Content-Type': 'application/json'
            },
            data: sendData
        }).then(function (response) {
            console.log("response", response);
        })
    }

    /*Websocket Connection*/
    $scope.connectChatWs = function () {
        userMessages = new WebSocket(CONFIG.chatUrl);

        var message = {
            fromUserId: $stateParams.fromUserId,
            toUserId: $stateParams.toUserId
        }
        var sendData = JSON.stringify(message);
        userMessages.onopen = function () {
            userMessages.send(sendData);
        };

        userMessages.onmessage = function (evt) {
            var allMsg = evt.data;
            var response = JSON.parse(allMsg);
            $scope.chatList.push(response[0]);
            var lastIndex = $scope.chatList.length - 1;
            var scrollTo = $scope.chatList[lastIndex];
            $timeout(function () {
                $anchorScroll(scrollTo.msgId);
            }, 200);
        };

        userMessages.onerror = function (evt) {};
        userMessages.onclose = function () {
            $scope.connectChatWs();
        }
    }

    /*Call to Connect Websocket Function*/
    $timeout(function () {
        $scope.connectChatWs();
    }, 800);

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

    /*Stop the Function When Page Changed*/
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        $scope.pageChanged = true;
        userMessages.close();
        console.log("userMessages", userMessages);
    });
}])
