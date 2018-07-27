'use strict';

angular.module('myApp.rosette', [])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('rosette', {
        url: '/rosette',
        templateUrl: 'partials/rosette/rosette.html',
        controller: 'RosetteCtrl'
      });
  }])

  .controller('RosetteCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('data/ratio-house-price-earnings.json')
      .success(function (data, status, headers, config) {
        $scope.rosette = {};

        $scope.rosette.data = [];
        var keys = d3.keys(data);

        $.each(keys, function (i, k) {
          keys[i] = +k;
          $scope.rosette.data[i] = { year: +k, data: data[k] };
        });
        $scope.rosette.selectedYear = keys[keys.length - 1];
      })
      .error(function (data, status, headers, config) {
        $scope.rosette = {};
      });
  }]);