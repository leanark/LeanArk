'use strict';

var animations = angular.module('myApp.animations', ['ngAnimate']);

animations.animation('.fade-in-out', function () {
  return {
    enter: function (element, done) {

      jQuery('footer').css({
        'opacity': 0
      });
      element.css({
        'opacity': 0.5, // work around for loading 
        'z-index': 100
      });

      jQuery(element).animate({
        opacity: 1
      }, done);

      // show footer
      jQuery('footer').animate({
        opacity: 1
      }, 1500, done);

      return function (isCancelled) {
        if (isCancelled) {
          jQuery(element).stop();
        }
      };
    },

    leave: function (element, done) {

      //hide footer
      jQuery('footer').css({
        'opacity': 0
      });

      element.css({
        'opacity': 0,
        'z-index': 99
      });

      jQuery(element).animate({
        opacity: 0
      }, done);

      return function (isCancelled) {
        if (isCancelled) {
          jQuery(element).stop();
        }
      };
    },

    move: function (element, done) {
      element.css('opacity', 0);
      jQuery(element).animate({
        opacity: 1
      }, done);

      return function (isCancelled) {
        if (isCancelled) {
          jQuery(element).stop();
        }
      };
    },

    addClass: function (element, className, done) { },
    removeClass: function (element, className, done) { }

  };

});