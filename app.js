'use strict';

angular.module('myApp', [
  'ui.router',
  'myApp.navTopBarMod',
  'myApp.services',
  'myApp.directives',
  'myApp.filters',
  'myApp.animations',
  'myApp.home',
  'myApp.about',
  'myApp.treemap',
  'myApp.rosette',
  'myApp.crossfilter',
  'myApp.gallery'
])
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$on("$stateChangeSuccess", function(){
    window.scrollTo(0,0);
  });
}])

.value('ip', 'https://leanark.com')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/"); 

}]);
