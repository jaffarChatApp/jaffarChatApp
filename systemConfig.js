/*Prod URl Configuration*/
/*ChatApp.constant('CONFIG', {
    'name': 'Chat App',
    'version': '1.0',
    'rootUrl': "https://stg.paycheckalpha.com:1880/chatApp/", // Production Server
    'chatUrl': "ws://stg.paycheckalpha.com:1880/ws/getChats", // Production WS
});*/

/*Remote URl Configuration*/
ChatApp.constant('CONFIG', {
    'name': 'Chat App',
    'version': '1.0',
    'rootUrl': "http://192.168.1.98:1997/chatApp/", // Production Server
    'chatUrl': "ws://192.168.1.98:1997/ws/getChats", // Production WS
});

/*Dev URl Configuration*/
/*
ChatApp.constant('CONFIG', {
    'name': 'Chat App',
    'version': '1.0',
    //'rootUrl': "http://127.0.0.1:1880/chatApp/", // Local Server
    'rootUrl': "http://localhost:1880/chatApp/", // Local Server
    'chatUrl': "ws://localhost:1880/ws/getChats", // Local WS
});
*/
