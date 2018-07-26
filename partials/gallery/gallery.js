'use strict';

angular.module('myApp.gallery', [])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state ('gallery', {
    url: '/gallery',
    templateUrl: 'partials/gallery/gallery.html',
    controller: 'GalleryCtrl'	  
  });	
}])

.directive('leanarkGallery', [function() {
  return {
	restrict: 'AE',
	templateUrl: 'partials/gallery/gallery-widget.html',
    link: function(scope, element, attrs) {
	  $('.block img').load(function(){
		scope.setupBlocks();
	  });
      
      $(window).resize(function(){
    	scope.setupBlocks();  
      });     
    }
  };
}])

.controller('GalleryCtrl', ['PinboardService', '$scope',  function(PinboardService, $scope) {  
  $scope.setupBlocks = function() {
    PinboardService.setupBlocks();	  
  };
}]);