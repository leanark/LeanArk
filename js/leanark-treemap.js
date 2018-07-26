var w = 1200,//$('.container-fluid').width(),
    h = 300,//$(window).height(),
    //color = d3.scale.category20b();
    color = d3.scale.ordinal().range(colorbrewer.RdGy[11]);

var treemap = d3.layout.treemap()
    .size([w, h])
    .sticky(true)
    .round(true)
    .value(function(d) { return d["population-in-london"]; });

var tip = d3.tip()
    .attr('class', 'd3-tip')   
    .offset([-10, 0])
    .html(function(d) {
      return d.nationality.toUpperCase()+"<hr/><span>" + d['population-in-london'] + "</span>";
    });

var svg = d3.select("#chart").append("svg")
    .style("width", "100%")
    .style("height", "100%")
    .attr('viewBox', '0, 0, ' + w + ', ' + h);

svg.call(tip);

d3.json("data/nationality-london.json", function(json) {
  json.shift(); //remove the first element ('United  Kingdom')
  var treemapdata = {name: "root", children: json};
  var cell = svg.data([treemapdata]).selectAll("g")
  .data(treemap.nodes)
  .enter().append("g")
  .attr("class", "cell")
  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});
  
  cell.append("rect")
  .attr("width", function(d) {return d.dx;})
  .attr("height", function(d) { return d.dy;})
  .style("fill", function(d,i) { return d.children ? null : color(i); })
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide);

  cell.append("text")
  .attr("x", function(d) { return d.dx / 2; })
  .attr("y", function(d) { return d.dy / 2; })
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .text(function(d) { return d.children ? null : d.nationality; })
  .style("fill", function(d, i) { return d3.hsl(color(i)).l < 0.5 ? d3.hsl(color(i)).brighter([3]) : d3.hsl(color(i)).darker([3]); })
  .style("z-index", function (d, i) {return i;});
});
