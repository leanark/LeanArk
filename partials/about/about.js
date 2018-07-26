'use strict';

angular.module('myApp.about', [])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about/about.html',
      controller: 'AboutCtrl'
  }); 
}])

.controller('AboutCtrl', ['$scope', '$http', 'ip', function($scope, $http, ip) {
  $scope.diagrams = ['img/home/diagram-data-vis-banner.svg', 'img/home/diagram-app-banner.svg', 'img/home/diagram-deployment-banner.svg'];
  
  $scope.getDiagram = function (elemId, diagram) {
    
    d3.xml(diagram, 'image/svg+xml', function(xml) {
      var width = 1750, height = 450;
  
      var svg = d3.select('#'+elemId).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', '0, 0, ' + width + ', ' + height);
      var g = svg.append('g');
  
      g.node().appendChild(xml.documentElement);
  
      d3.selectAll('[id*=road]').on('mouseover', function() {
        return d3.selectAll('[id*=road]').classed('active-path', true);
      })
      .on('mouseout', function() {
        return d3.selectAll('[id*=road]').classed('active-path', false);
      });
    }); 
  };
}]);
