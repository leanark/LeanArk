'use strict';

angular.module('myApp.crossfilter', [])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('crossfilter', {
        url: '/crossfilter',
        templateUrl: 'partials/crossfilter/crossfilter.html',
        controller: 'CrossfilterCtrl'
      });

  }])

  .controller('CrossfilterCtrl', ['$scope', function ($scope) {

  }]);
