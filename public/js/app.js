'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io',
  'ngMaterial',
  'ngMdIcons',
  'md.data.table'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/home', {
      templateUrl: 'partials/home',
      controller: 'HomeController'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
}).
config(function($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey');
}).
run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
  $rootScope
    .$on('$stateChangeSuccess',
      function(event){
        if (!$window.ga)
          return;
        $window.ga('send', 'pageview', { page: $location.path() });
      });
}]);
