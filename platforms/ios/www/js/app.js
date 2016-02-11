angular.module('underscore', [])
.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('alessio', [
  'ionic',
  'backand',
  'alessio.directives',
  'alessio.controllers',
  'alessio.services',
  'alessio.views',
  'underscore',
  'ngOpenFB'
])

.config(function (BackandProvider) {
  BackandProvider.setAppName('alessio');
  BackandProvider.setAnonymousToken('061c82a5-cc43-443f-8de5-3ddad1fb6cfb');
})

.run(function($ionicPlatform, ngFB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    ngFB.init({appId: '1223587537669382'});
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('facebook-sign-in', {
    url: "/facebook-sign-in",
    templateUrl: "views/auth/facebook-sign-in.html",
    controller: 'WelcomeCtrl'
  })

  .state('dont-have-facebook', {
    url: "/dont-have-facebook",
    templateUrl: "views/auth/dont-have-facebook.html",
    controller: 'WelcomeCtrl'
  })

  .state('create-account', {
    url: "/create-account",
    templateUrl: "views/auth/create-account.html",
    controller: 'CreateAccountCtrl'
  })

  .state('welcome-back', {
    url: "/welcome-back",
    templateUrl: "views/auth/welcome-back.html",
    controller: 'WelcomeBackCtrl'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/app/side-menu.html",
    controller: 'AppCtrl'
  })

  // APP HOME
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "views/app/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/facebook-sign-in');
})

;
