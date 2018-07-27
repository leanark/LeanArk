'use strict';

var directives = angular.module('myApp.directives', []);

directives.directive('leanarkGallery', [function () {
  return {
    restrict: 'AE',
    templateUrl: 'partials/gallery/gallery-widget.html',
    link: function (scope, element, attrs) {
    }
  };
}])

directives.directive('leanarkCrossfilter', [function () {
  return {
    restrict: 'AE',
    templateUrl: 'partials/crossfilter/crossfilter-widget.html'
  };
}]);

directives.directive('leanarkRosetteChart', [function () {

  var   //width = $(window).height()-70,
    //height = $(window).height()/2-140,
    width = 1200,
    height = 400,
    margin = 0,
    //radius = Math.min(width, height) / 2,
    radius = 200,
    innerRadius = 0.3 * radius;

  var percentFormat = d3.format("%");

  var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) { return d.value; });

  var maxValue;

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
      return d.data.key.toUpperCase() + "<hr/><span>" + percentFormat(d.data.value / 100) + "</span>";
    });

  var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
      return (radius - innerRadius) * (d.data.value / maxValue) + innerRadius;
    });

  var outlineArc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {

      var svg = d3.select(element[0])
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr('viewBox', '0, 0, ' + width + ', ' + (height + margin))
        .append("g")
        .attr('transform', 'translate(' + width / 2 + ',' + (height / 2 + margin / 2) + ')')
        .call(tip);

      drawChart(scope.d.data, scope.d.year);

      function drawChart(data, year) {

        svg.selectAll('*').remove();
        var values = [];
        data.forEach(function (d) {
          values.push(+d.value);
        });

        maxValue = d3.max(values);

        var color = d3.scale.ordinal()
          .domain(values)
          .range(colorbrewer.RdGy[11]);

        var solidArc = svg.selectAll(".solidArc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "solidArc");

        solidArc.append("path")
          .attr("fill", function (d) { return color(d.value); })
          .attr("stroke", "#cccccc")
          .attr("d", arc)
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);

        var outerPath = svg.selectAll(".outlineArc")
          .data(pie(data))
          .enter().append("path")
          .attr("fill", "none")
          .attr("stroke", "#cccccc")
          .attr("class", "outlineArc")
          .attr("d", outlineArc);

        svg.append("text")
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(Math.round(year));
      };
    }
  };
}]);
