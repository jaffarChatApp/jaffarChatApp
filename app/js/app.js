//var ChatApp = angular.module('ChatApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'webcam']);
var ChatApp = angular.module('ChatApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial']);

var OneSignal = window.OneSignal || [];
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

/*console.log("OneSignal", OneSignal);
OneSignal.push(function () {
    OneSignal.init({
        appId: "fe9010f6-0bb3-464a-9e55-6aab21b2f944",
        notifyButton: {
            enable: false,
        }
    });
});*/
