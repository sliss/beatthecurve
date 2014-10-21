var btcApp = angular.module('btcApp', [
  'ngRoute',
  'ui.bootstrap'
]);

btcApp.controller('HomeController', ['$scope', '$modal', function($scope, $modal) {
  console.log('home controller');
  $scope.items = ['item1', 'item2', 'item3'];
  
  $scope.open = function () {
    console.log('open modal!');
    $modal.open({
      templateUrl: 'partials/modalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };

}]);

//controller for the modal
angular.module('btcApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

btcApp.directive('mainChart', function() {
    function link() {
      console.log('mainChart');

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
          .attr("height", diameter + 50)
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