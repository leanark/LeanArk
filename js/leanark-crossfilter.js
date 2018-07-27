'use strict';

var barChart = dc.barChart("#bar-chart"),
  rowChart1 = dc.rowChart('#row-chart1'),
  rowChart2 = dc.rowChart('#row-chart2');

d3.csv('data/ward_short.csv', function (data) {

  var dateFormat = d3.time.format("%Y%m");
  data.forEach(function (d) {
    d.date = dateFormat.parse(d.Month); //convert string to date object
    d.Count = +d.Count;
  });

  var cf = crossfilter(data);
  var all = cf.groupAll();

  var byYear = cf.dimension(function (d) { return d3.time.year(d.date).getFullYear(); });
  var groupByYear = byYear.group().reduceSum(function (d) { return d.Count; });
  var byCrime = cf.dimension(function (d) { return d.MajorText; });
  var groupByCrime = byCrime.group();

  var byLANAME = cf.dimension(function (d) { return d.LANAME; });
  var groupByLANAME = byLANAME.group().reduceSum(function (d) { return d.Count; });

  //==============
  rowChart1
    .width(500)
    .height(250)
    .margins({ top: 10, left: 10, right: 10, bottom: 30 })
    .group(groupByCrime)
    .dimension(byCrime)

    .ordinalColors(colorbrewer.RdGy[11].slice(8, 10))
    .label(function (d) {
      return d.key;
    })
    .title(function (d) {
      return d.value;
    })
    .elasticX(true)
    .xAxis().ticks(10);
  //==============
  rowChart2
    .width(500)
    .height(550)
    .margins({ top: 10, left: 10, right: 10, bottom: 30 })
    .group(groupByLANAME)
    .dimension(byLANAME)

    .ordinalColors(colorbrewer.RdGy[11].slice(4, 5))
    .label(function (d) {
      return d.key;
    })
    .title(function (d) {
      return d.value;
    })
    .elasticX(true)
    .xAxis().ticks(10);
  //==============
  barChart
    .width(500)
    .height(250)
    .margins({ top: 10, left: 50, right: 20, bottom: 30 })
    .x(d3.scale.linear().domain([2010, 2020]))
    .ordinalColors(colorbrewer.RdGy[11])
    .brushOn(false)
    .centerBar(true)
    .xAxisLabel("Year")
    .yAxisLabel("Crime Incidents")
    .elasticY(true)
    .dimension(byYear)
    .group(groupByYear)
    .on('renderlet', function (chart) {
      chart.selectAll('rect').on("click", function (d) {
        console.log("click!", d);
      });
    });
  //=============

  jQuery('#charts').toggleClass('hidden');
  jQuery('#loading').toggleClass('hidden');

  dc.renderAll(); //render all charts

}); 
