var btcApp = angular.module('btcApp', [

]);

btcApp.controller('HomeController', ['$scope', function($scope) {
  console.log('home controller');
}]);

btcApp.directive('mainChart', function() {
    function link() {
      console.log('mainChart');
      /*
      var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
           
      // Parse the date / time
      var parseDate = d3.time.format("%m-%d-%y").parse;
       
      var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
       
      var y = d3.scale.linear().range([height, 0]);
       
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(d3.time.format("%m-%d"))
          .ticks(2);
       
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);
       
      var svg = d3.select("chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
       
      d3.csv("sample_infections.csv", function(error, data) {
       
          data.forEach(function(d) {
              d.date = parseDate(d.date);
              d.value = +d.value;
          });
        
        x.domain(data.map(function(d) { return d.date; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
       
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );
       
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Cases");
       
        svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .style("fill", "lightcoral")
            .attr("x", function(d) { return x(d.date); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });
       
      });*/


      d3.json("linePlusBarData.json",function(error,data) {
        nv.addGraph(function() {
            var chart = nv.models.linePlusBarChart()
                  .margin({top: 30, right: 60, bottom: 50, left: 70})
                  .color(['blue', 'green', 'yellow'])
                  //We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
                  .x(function(d,i) { return i })
                  .y(function(d,i) {return d[1] })

                  ;

            chart.xAxis.tickFormat(function(d) {
              var dx = data[0].values[d] && data[0].values[d][0] || 0;
              return d3.time.format('%x')(new Date(dx))
            });

            chart.y1Axis
                .tickFormat(d3.format(',f'));

            chart.y2Axis
                .tickFormat(function(d) { return '$' + d3.format(',f')(d) });

            chart.bars.forceY([0]);

            d3.select('#multichart svg')
              .datum(data)
              .transition()
              .duration(0)
              .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });

      });
    }

    return {
      link: link
    };
  });

btcApp.directive('treeChart', function() {
    function link() {
      console.log('treeChart');
      var diameter = 1000;

      var tree = d3.layout.tree()
          .size([360, diameter / 2 - 120])
          .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

      var diagonal = d3.svg.diagonal.radial()
          .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

      var svg = d3.select("tree").append("svg")
          .attr("width", diameter)
          .attr("height", diameter - 150)
        .append("g")
          .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

      d3.json("flare.json", function(error, root) {
        var nodes = tree.nodes(root),
            links = tree.links(nodes);

        var link = svg.selectAll(".link")
            .data(links)
          .enter().append("path")
            .attr("class", "link")
            .attr("d", diagonal);

        var node = svg.selectAll(".node")
            .data(nodes)
          .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

        node.append("circle")
            .attr("r", 4.5);

        node.append("text")
            .attr("dy", ".31em")
            .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
            .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
            .text(function(d) { return d.name; });
      });

      d3.select(self.frameElement).style("height", diameter - 150 + "px");

       //****
    }

    return {
      link: link
    };
  });