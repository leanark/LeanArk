'use strict';

angular.module('myApp', [
  'ui.router',
  'myApp.navTopBarMod',
  'myApp.services',
  'myApp.directives',
  'myApp.animations',
  'myApp.home',
  'myApp.treemap',
  'myApp.rosette',
  'myApp.crossfilter'
])
  .run(['$rootScope', '$state', '$stateParams',
       function ($rootScope, $state, $stateParams) {
  
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on("$stateChangeSuccess", function () {
      window.scrollTo(0, 0);     
    });
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

  }]);
