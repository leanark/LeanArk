'use strict';

angular.module('myApp.home', [])

  .config(['$stateProvider',  function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/', 
        templateUrl: 'partials/home/home.html',
        controller: 'HomeCtrl',       
      })
      // created to support scrolling to gallery section of the home page
      .state('gallery', {
        url: '/',
        templateUrl: 'partials/home/home.html',
        controller: 'HomeCtrl',
        onEnter: function ($timeout) {
          $timeout(function() { 
            $('html, body').animate({     
              scrollTop: $('#gallery').offset().top
            }, 2000);
          }, 100)
        }
      });
  }])

  .controller('HomeCtrl', ['$scope', function ($scope) {;

    $scope.isCollapsed = true;
    $scope.diagrams = ['img/home/diagram-app-banner.svg', 'img/home/diagram-deployment-banner.svg', 'img/home/diagram-data-vis-banner.svg'];
    $scope.getDiagram = function (elemId, diagram) {

      d3.xml(diagram, 'image/svg+xml', function (xml) {
        var width = 1750, height = 560;
        var svg = d3.select('#' + elemId).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', '0, 0, ' + width + ', ' + height);
        var g = svg.append('g').attr('transform','translate(-10, 80)'); 

        g.node().appendChild(xml.documentElement);

        d3.selectAll('[id*=road]').on('mouseover', function () {
          return d3.selectAll('[id*=road]').classed('active-path', true);
        })
          .on('mouseout', function () {
            return d3.selectAll('[id*=road]').classed('active-path', false);
          });
      });
    };

    $scope.items = [
      {
        'title': 'Front end',
        'image': 'img/home/webapp.png',
        'details': [
          'Cross-browser functionality',
          'Cross-platform functionality',
          'Cross-device functionality',
          'MVC architecture',
          'Usability'
        ],
        'showDetails': 3,
        'detailsAction': 'More'
      },
      {
        'title': 'API',
        'image': 'img/home/api.png',
        'details': [
          'Web API',
          'Service-oriented architecture',
          'REST',
          'RDF',
          'JSON'
        ],
        'showDetails': 3,
        'detailsAction': 'More'
      },
      {
        'title': 'Analytics',
        'image': 'img/home/analytics.png',
        'details': [
          'Big data',
          'Machine learning',
          'Data mining',
          'Predictive analytics',
          'Business intelligence',
          'Data Visualisation'
        ],
        'showDetails': 3,
        'detailsAction': 'More'
      },
      {
        'title': 'Data storage',
        'image': 'img/home/db.png',
        'details': [
          'Cloud computing',
          'Scalability',
          'Amazon S3',
          'Microsoft Azure',
          'NoSQL'
        ],
        'showDetails': 3,
        'detailsAction': 'More'
      }
    ];

    $scope.toggleDetails = function (obj, $event) {
      obj.showDetails = obj.showDetails === 3 ? obj.details.length : 3;
      obj.detailsAction = obj.detailsAction === 'More' ? 'Less' : 'More';
    };
  }]);
