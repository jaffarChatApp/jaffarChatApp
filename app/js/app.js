//var ChatApp = angular.module('ChatApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'webcam']);
var ChatApp = angular.module('ChatApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial']);
var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
    OneSignal.init({
        appId: "fe9010f6-0bb3-464a-9e55-6aab21b2f944",
        notifyButton: {
            enable: false,
        }
    });
});
