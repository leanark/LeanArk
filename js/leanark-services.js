'use strict';

var services = angular.module('myApp.services', []);

services.factory('PinboardService', [function() {
  var colCount = 0,
	  colWidth = 400,
	  margin = 10,
	  spaceLeft = 0,
	  windowWidth = 0,
	  blocks = [];

  return {
	setupBlocks: function() {
	  windowWidth = $(window).width();
	  blocks = [];
	  
	  // Calculate the margin so the blocks are evenly spaced within the window
	  colCount = Math.floor(windowWidth/(colWidth+margin*2));
	  spaceLeft = (windowWidth - ((colWidth*colCount)+(margin*(colCount-1)))) / 2;
		
	  for(var i=0;i<colCount;i++){
	    blocks.push(margin);
	  }
	  this.positionBlocks();				
	},
	positionBlocks: function () {
	  $('.block').each(function(i){
	    var min = Math.min.apply(Math, blocks),
		    index = $.inArray(min, blocks),
			leftPos = margin+(index*(colWidth+margin));
		$(this).css({
		  'left':(leftPos+spaceLeft)+'px',
		  'top':min+'px'
		});
		blocks[index] = min+$(this).outerHeight()+margin;
	  });
	  var max = Math.max.apply(Math, blocks);
	  $( '.block' ).parent().css( 'height', max ); //to push footer beneath
	}
  };
}]);

services.factory('CrossfilterService', [function(){
  var barChart = dc.barChart("#bar-chart"),
      rowChart1 = dc.rowChart('#row-chart1'),
      rowChart2 = dc.rowChart('#row-chart2');
      //lineChart = dc.lineChart('#line-chart'),
      //volumeChart = dc.barChart('#volume-chart');
  return {
    renderCharts: function(data) {
      //d3.csv('data/ward.csv', function(data) {
    		  
      //Count: "3"
      //LANAME: "Barking and Dagenham
      //"MajorText: "Theft & Handling
      //"MinorText: "Theft/Taking Of Pedal Cycle
      //"Month: "201305
      //"Spatial_WardCode: "E05000026
      //"Spatial_WardName: "Abbey"
      var dateFormat = d3.time.format("%Y%m");
	    data.forEach(function(d) {
	    d.date = dateFormat.parse(d.Month); //convert string to date object
	    d.month = d3.time.month(d.date); //pre calculate month
	    d.Count = +d.Count;
	    });
	  
	    var cf = crossfilter(data);
	    var all = cf.groupAll();

	    var byYear = cf.dimension(function(d) { return d3.time.year(d.date).getFullYear(); }); 
	    var groupByYear = byYear.group().reduceSum(function(d) { return d.Count;});
	    //var byMonth = cf.dimension(function(d) { return d.month; }); 
	    //var groupByMonth = byMonth.group().reduceSum(function(d) { return d.Count;});
	    var byCrime = cf.dimension(function(d) { return d.MajorText; });
	    var groupByCrime = byCrime.group();
	    /*  groupByCrime.top(Infinity).forEach(function(d, i) {
	    console.log(d.key + ": " + d.value);
	    });*/
	  
	    var byLANAME = cf.dimension(function(d) { return d.LANAME; });
	    var groupByLANAME = byLANAME.group().reduceSum(function(d) { return d.Count; });
	 
	    //==============
	    rowChart1
	    .width(500)
	    .height(250)
	    .margins({top: 10, left: 10, right: 10, bottom: 30})
	    .group(groupByCrime)
	    .dimension(byCrime)
	  
	    .ordinalColors(colorbrewer.RdGy[11].slice(8,10))
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
	    .margins({top: 10, left: 10, right: 10, bottom: 30})
	    .group(groupByLANAME)
	    .dimension(byLANAME)
	  
	    .ordinalColors(colorbrewer.RdGy[11].slice(4,5))
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
	    .margins({top: 10, left: 50, right: 20, bottom: 30})
	    .x(d3.scale.linear().domain([2010,2020]))
	    .ordinalColors(colorbrewer.RdGy[11])
	    .brushOn(false)
	    .centerBar(true)
	    .xAxisLabel("Year")
	    .yAxisLabel("Crime Incidents")
	    .elasticY(true)
	    .dimension(byYear)
	    .group(groupByYear)
	    //.dimension(byCount)
	    //.group(groupByCount)
	    .on('renderlet', function(chart) {
	      chart.selectAll('rect').on("click", function(d) {
	          console.log("click!", d);
	      });
	  });
	  //=============
	  /*  lineChart
	  .renderArea(true)
	  .width(990)
	  .height(200)
	  .ordinalColors(colorbrewer.RdGy[11])
	  .transitionDuration(1000)
	  .margins({top: 10, right: 40, bottom: 25, left: 40})
	  .dimension(byMonth)
	  .mouseZoomable(true)
	  
	  .rangeChart(volumeChart)
	  .x(d3.time.scale().domain([new Date(2013, 0, 1), new Date(2015, 11, 31)]))
	  .round(d3.time.month.round)
	  .xUnits(d3.time.months)
	  .elasticY(true)
	  .renderHorizontalGridLines(true)
	  .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
	  .brushOn(false)
	        
	  .group(groupByMonth, 'Monthly Crime Incidents')
	  .valueAccessor(function (d) {
	    return d.value;
	  })*/
	/*    
	  .stack(groupTtlByMonth, 'Monthly Count Total', function (d) {
	    return d.value;
	  })
	     */   
	/*  .title(function (d) {
	    var value = d.value.avg ? d.value.avg : d.value;
	    if (isNaN(value)) {
	      value = 0;
	    }
	    return dateFormat(d.key) + '\n' + value;
	  });
	  
	  volumeChart.width(990)
	  .height(40)
	  .margins({top: 0, right: 40, bottom: 20, left: 40})
	  .dimension(byMonth)
	  .group(groupByMonth)
	  .ordinalColors(colorbrewer.RdGy[11])
	  .centerBar(true)
	  .gap(1)
	  .x(d3.time.scale().domain([new Date(2013, 0, 1), new Date(2015, 11, 31)]))
	  .round(d3.time.month.round)
	  .alwaysUseRounding(true)
	  .xUnits(d3.time.months)
	  .elasticY(true)
	  .yAxis().ticks(0);*/
	  
	  //=============
	  
	  dc.renderAll(); //render all charts
	  
	  return true;

//});
	  
    }
  };
	
}]);