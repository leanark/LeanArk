'use strict';

angular.module('myApp.navTopBarMod',[])
.controller('NavTopBarCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.getSvg = function (elemId, svg) {
    d3.xml(svg, 'image/svg+xml', function(xml) {
      console.log(xml);
      var width = 544, height = 203;
      var svg = d3.select('#'+elemId).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', '0, 0, ' + width + ', ' + height);
      var g = svg.append('g');
      g.node().appendChild(xml.documentElement);
    });
  };
}]);
