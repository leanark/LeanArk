'use strict';

angular.module('myApp.home', [])

  .config(['$stateProvider', function ($stateProvider) {
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
          $timeout(function () {
            $('html, body').animate({
              scrollTop: $('#gallery').offset().top
            }, 2000);
          }, 100)
        }
      });
  }])

  .controller('HomeCtrl', ['$scope', function ($scope) {

    $scope.isCollapsed = true;
    $scope.diagrams = ['img/home/diagram-app-banner.svg', 'img/home/diagram-deployment-banner.svg', 'img/home/diagram-data-vis-banner.svg'];
    $scope.getDiagram = function (elemId, diagram) {

      d3.xml(diagram, 'image/svg+xml', function (xml) {
        var width = 1750, height = 560;
        var svg = d3.select('#' + elemId).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', '0, 0, ' + width + ', ' + height);
        var g = svg.append('g').attr('transform', 'translate(-10, 80)');

        g.node().appendChild(xml.documentElement);

        d3.selectAll('[id*=road]').on('mouseover', function () {
          return d3.selectAll('[id*=road]').classed('active-path', true);
        })
          .on('mouseout', function () {
            return d3.selectAll('[id*=road]').classed('active-path', false);
          });

        if (elemId === 'slide1') {
          $scope.runAnimation1();
        }

      });
    };

    $scope.runAnimation1 = function () {
      var tl1 = new TimelineMax();
      var envelopes = ['#text3046-5', '#text3349', '#text3353', '#text3357', '#text3361', '#text3365', '#text3369', '#text3373'];
      tl1
        .from('#text5385', 2, { opacity: 0 }) // left arrow           
        .staggerFrom(envelopes, 2, { opacity: 0 }, 0.2, '-=1') // envelopes
        .from('#text6329', 1, { opacity: 0 }, '-=1.5'); // right arrow
    }

    $scope.runAnimation2 = function () {
      var tl2 = new TimelineMax();
      tl2
        .from('#road201', 0.5, { strokeOpacity: 0 })
        .from('#tspan3088', 4, { strokeDasharray: 3000, strokeDashoffset: 3000, strokeWidth: 10, ease: Power2.easeOut });
    }

    $scope.runAnimation3 = function () {
      var tl3 = new TimelineMax();
      var bigDataContainers = ['#text3489', '#text3493', '#text3497', '#text3501', '#text3505', '#text3509', '#text3513', '#text3517'];
      tl3
        .from('#text3275', 2, { y: -360 })
        //.staggerTo(bigDataContainers, 0.5, { fill: '#d6604d' }, 0.2, '-=1')
        .staggerFrom(['#text5088', '#text5092', '#text5084'], 2, { y: 10 }, 0.2, '-=1');
    }

    $scope.navigateToSlide = function (e) {

      var active = $('#carousel').find('.carousel-inner > .item.active');
      var from = active.index(); // index of active current slide

      var to = (e.target.className.indexOf('right') != -1) ? (from + 1) : (from - 1); // index of the next slide
      if (to == 3) {
        to = 0;
      }
      if (to == -1) {
        to = 2;
      }

      switch (to) {
        case 0:
          $scope.runAnimation1();
          console.log('runAnimation1');
          break;
        case 1:
          $scope.runAnimation2();
          console.log('runAnimation2');
          break;
        case 2:
          $scope.runAnimation3();
          console.log('runAnimation3');
          break;
        default:
          $scope.runAnimation1();
          console.log('runAnimation1');
      }
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
