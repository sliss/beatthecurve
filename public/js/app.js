var btcApp = angular.module('btcApp', [

]);

btcApp.controller('HomeController', ['$scope', function($scope) {
  console.log('home controller');
  // ******* chart visualization... should stick this in a directive
  /*
  console.log('mainChart');
  var color = d3.scale.threshold()
        .domain([1, 2, 3, 4, 5, 6, 7, 8])
        .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);

  var width = 700,
      height = 460;

  var projection = d3.geo.mercator()
      .center([-71.7, 42])
      .rotate([0, 0])
      .scale(11000)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns","http://www.w3.org/2000/svg")
      .attr("version",1.1); 


  d3.json("MA_Topo_Properties.json", function(error, ma) {
      svg.selectAll(".town")
        .data(topojson.feature(ma, ma.objects.MA_Towns).features)
      .enter()
      .append("a")
        .attr("xlink:href", function(d) { return "/#/towns/" + d.properties.TOWN.toLowerCase().replace(' ','_'); })
        .attr("title", function(d) { return d.properties.TOWN; })
      .append("path")
        //.attr("class", function(d) { return "town " + d.properties.TOWN; })
        .attr("class", function(d) { return "town " + d.properties.TOWN; })
        .style("fill", function(d) { return color(d.properties.victory_district); })
        .attr("d", path);

      svg.append("path")
          .datum(topojson.mesh(ma, ma.objects.MA_Towns, function(a, b) { return a !== b; }))
          .attr("class", "tract-border")
          .attr("d", path);  
      console.log('render map complete');
  });

*/
}]);

btcApp.directive('mainChart', function() {
    function link() {
      console.log('mainChart');
      var color = d3.scale.threshold()
            .domain([1, 2, 3, 4, 5, 6, 7, 8])
            .range(['#4628e8','#4628e8', '#228dea', '#1cecbc', '#16ee27', '#9af00f', '#f3ab09', '#f50202']);

      var width = 700,
          height = 460;

      var projection = d3.geo.mercator()
          .center([-71.7, 42])
          .rotate([0, 0])
          .scale(11000)
          .translate([width / 2, height / 2]);

      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select("chart").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("xmlns","http://www.w3.org/2000/svg")
          .attr("version",1.1); 
    

      d3.json("MA_Topo_Properties.json", function(error, ma) {
          svg.selectAll(".town")
            .data(topojson.feature(ma, ma.objects.MA_Towns).features)
          .enter()
          .append("a")
            .attr("xlink:href", function(d) { return "/#/towns/" + d.properties.TOWN.toLowerCase().replace(' ','_'); })
            .attr("title", function(d) { return d.properties.TOWN; })
          .append("path")
            //.attr("class", function(d) { return "town " + d.properties.TOWN; })
            .attr("class", function(d) { return "town " + d.properties.TOWN; })
            .style("fill", function(d) { return color(d.properties.victory_district); })
            .attr("d", path);

             

          

          svg.append("path")
              .datum(topojson.mesh(ma, ma.objects.MA_Towns, function(a, b) { return a !== b; }))
              .attr("class", "tract-border")
              .attr("d", path);  
          console.log('render map complete');
      });
    }

    return {
      link: link
    };
  });