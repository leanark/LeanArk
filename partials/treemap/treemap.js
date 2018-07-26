'use strict';

angular.module('myApp.treemap', [])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('treemap', {
      url: '/treemap',
      templateUrl: 'partials/treemap/treemap.html',
      controller: 'TreemapCtrl'
  });	
}])

.controller('TreemapCtrl', ['$scope',  function($scope) {
  
}]);