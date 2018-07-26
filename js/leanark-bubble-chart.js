d3.csv("data/expertise.csv", function (data) {

  var w = 800,
      h = 600;

  var nodes = data.map(function(d) { return {name: d.name, radius: Number(d.strength) }; }),
      color = d3.scale.ordinal().range(colorbrewer.Greys[9]);

  var force = d3.layout.force()
      .gravity(0.06)
      .distance(200)
      .charge(function(d, i) { return i ? -100 : -2000; })
      .nodes(nodes)
      .size([w, h]);

  var root = nodes[0];
      root.radius = 0;
      root.fixed = true;

  force.start();

  var svg = d3.select("#bubble-chart").append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr('viewBox', '0, 0, ' + w + ', ' + h);

  var node = svg.selectAll(".bubble-node")
      .data(nodes.slice(1))
      .enter().append("g")
      .attr("class", "bubble-node")
      .call(force.drag);

  node.append("circle")
  .attr("r", function(d) { return d.radius*4; })
  .style("fill", function(d, i) { return color(i % 6); });

  node.append("text")
  .attr("class", "bubble-label")
  .attr("dx", 12)
  .attr("dy", ".35em")
  .style("font-size", function(d) { return Math.max(12, d.radius*2) + "px"; })
  .text(function(d) { return d.name; });

  force.on("tick", function(e) {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) {
      q.visit(collide(nodes[i]));
    }

    svg.selectAll(".bubble-node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y  + ")"; });
  });

  svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    force.resume();
  });

  function collide(node) {
    var r = node.radius + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
        || x2 < nx1
        || y1 > ny2
        || y2 < ny1;
    };
  }
});
