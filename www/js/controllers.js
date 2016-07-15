

angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('cloudCtrl', function($scope) {

})

.controller('janeDoeCtrl', function($scope) {

})

.controller('patientsCtrl', function($scope) {

})

.controller('tP53GeneVariantsCtrl', function($scope, $http) {
  console.log("hello in function");


var sizes = [15,30,50,80];
var names = ['very rare', 'rare', 'common','very common'];

  var trace1 = {
      overlaying:false,
      showlegend: true,
      type: 'scatter',
      hoverinfo: 'text',
      //line:false,
       x: [],
       y: [],
       text: [],
       name: [],
       // initial text -->text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
       mode: 'markers',
       marker:{
         sizemode: "diameter",
         //sizeref: 0.0006,
         color: [],
         line: {color: 'white'},
         size: [],
         opacity:0.7,


       }
     };
//read patient file
       $http.get("js/janedoe.php").then(function (response) {
         $scope.patientVariants = response.data.JaneDoe;
      //   console.log($scope.patientVariants[0].Mutation1);
       });

//read gene variant file
  $http.get("js/TP53.php").then(function (response) {
      console.log("hello in function");
      $scope.myVariants = response.data.records;


//get number of different counts in top 20 TP53 Variants

var all_counts = new Array();
for (i = 0; i< $scope.myVariants.length;i++)
{
  all_counts[i]= $scope.myVariants[i].Count;
}
var number_of_counts = $scope.myVariants.length;

var unique = all_counts.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

console.log(unique.length);
var number_of_counts = unique.length;

//determine number of cohorts

var number_of_cohorts = 0;

if (number_of_counts <=3)
{
  number_of_cohorts= number_of_counts;

}
else {
  number_of_cohorts = 4;
}

//determine number cutoff in  cohorts
//first number cutoff will always be ceil function
var cutoff = Math.floor(number_of_counts / number_of_cohorts);
var firstcutoff= Math.ceil(number_of_counts / number_of_cohorts);

//assign each count to a cohort
console.log(cutoff);

unique.sort();

function DetermineSize(index){

var sizefinder = new Array();
var counter = 0
for (var i=0;i<number_of_cohorts;i++)
{
  for (var j=0;j<cutoff;j++)
  {
    sizefinder[i] = new Array();
    sizefinder[i][j]= unique[counter];
    counter++;
    //console.log(sizefinder[i][j]);
  }
}

for (var k = 0;k<sizefinder.length; k++)
    {
      if (sizefinder[k][0]==$scope.myVariants[index].Count)
      {

        return k;
      }
    }

  }


var patientVariant= 0;
for (var i =0; i<$scope.myVariants.length;i++)
{
        if ($scope.patientVariants[0].Mutation1==$scope.myVariants[i].AAMutation)
        {
          console.log($scope.patientVariants[0].Mutation1);
          //trace1.x[i]=5;
          patientVariant=i;


          trace1.marker.color[i]='rgb(237, 250, 90)';
        }

        else {
          trace1.marker.color[i]='rgb(144,195,212)';
      }

      trace1.marker.size[i]=  sizes[DetermineSize(i)];
      console.log(trace1.marker.size[i]);
      //trace1.name[i]=  names[DetermineSize(i)];

        trace1.y[i] = 0;


      trace1.x[i]=$scope.myVariants[i].Position;
      trace1.text[i]=$scope.myVariants[i].AAMutation;



}

var data = [trace1];

var positions =[];
 for (var i =0; i < $scope.myVariants.length;i++)
  {
    positions[i] = $scope.myVariants[i].Position;

  }

  positions.sort();
  console.log(positions[0]);

//rare, common, very common legend
var layout = {
title:'Relative frequency of the '+$scope.myVariants.length+" most common variants of TP53. Patient variant is highlighted.",
//  title: "The graph below displays the patient's detected\nTP53 variant and variants near it in sequential order, based on AA position\nThe larger the bubble, the more common the variant is in the population (data from COSMIC).\nHover over each bubble to learn more information about each variant.\nThe patient's variant is highlighted in yellow.",
  font: {size: 9.5},
  plot_bgcolor: 'rgb(223, 223, 223)',
  hovermode: 'closest',
  margin: {
    l: 10,
    r: 0,
    b: 50,
    t: 20

  },
  scale:10,
  xaxis:{
    visible:true,

    //just label patient and start and finish
    showticklabels:true,
    //autotick:false,

    tickangle: 45,
    //ntick: 20,
    //dtick:10,
    ticklen: 5,
    gridwidth: 5,
    tickvals: [positions[0],$scope.myVariants[patientVariant].Position,positions[($scope.myVariants.length)-1]],
    ticktext:[positions[0],$scope.myVariants[patientVariant].Position,positions[($scope.myVariants.length)-1]],
    title: 'Position (AA)'
  },
  yaxis:{
    showticklabels: false,


  }
  /*angularaxis: {
    tickcolor: 'rgb(253,253,253)',
    visible: false

}*/

};


/*  for (var i =0; i < $scope.myVariants.length;i++)
  {
    layout.xaxis.tickvals[i] = $scope.myVariants[i].Position;
    layout.xaxis.ticktext[i]=$scope.myVariants[i].Position;
  }*/


$(document).ready(function(){

Plotly.plot(document.getElementById("tester"), data, layout, {displayModeBar: false});

var myPlot = document.getElementById('tester');

var d3 = Plotly.d3;

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
/*myPlot.on('plotly_hover', function(data){
    //d3 = Plotly.d3;
  console.log("hello");

    div.transition()
    .duration(200)
    .style("opacity", .9);
    div.html("hello")
    .style("left", (170)+ "px")
    .style("top", 450 + "px");
})
 myPlot.on('plotly_unhover', function(data){
   div.transition()
   .duration(500)
   .style("opacity", 0);
   div.disable();

});*/
var hoverInfo = document.getElementById('hoverinfo');
myPlot.on('plotly_hover', function(data){

    var infotext = data.points.map(function(d){
      for (var i =0; i< $scope.myVariants.length;i++)
      {
        if(d.x.toPrecision(3)== $scope.myVariants[i].Position)
        {
          return ('Gene: TP53'+'<br/>AA Mutation: '+$scope.myVariants[i].AAMutation+'<br/>CDS Mutation: '+$scope.myVariants[i].CDSMutation+'<br/>Position: '+$scope.myVariants[i].Position+'<br/>Resistance: '+$scope.myVariants[i].Resistant+'<br/>Sensitivity: '+$scope.myVariants[i].Sensitive);
        }
      }

    });

    hoverInfo.innerHTML = infotext.join('');
})
 .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = 'Hover over graph for information on each variant.';
});

 })
});


})


.controller('pIK3CAGeneVariantsCtrl', function($scope,$http) {

  console.log("hello in function");


  var trace1 = {
      type: 'scatter',
      name: 'TP53 Variants',
    //  hoverinfo: 'text+x+y',
      //line:false,
       r: [],
       t: [],
      // text: [],
       // initial text -->text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
       mode: 'markers',
       marker:{
         //sizemode: "area",
         sizeref: 0.06,
        color: 'rgb(144,195,212)',
        // line: {color: 'white'},
         size: 30,
         opacity:0.7
       }
     };

       $http.get("js/janedoe.php").then(function (response) {
         $scope.patientVariants = response.data.JaneDoe;
      //   console.log($scope.patientVariants[0].Mutation1);
       });


  $http.get("js/TP53.php").then(function (response) {
      console.log("hello in function");
      $scope.myVariants = response.data.records;
      console.log("hello in function");
    //  console.log($scope.myVariants[0].ID);
    //  console.log($scope.myVariants.length);

var count = 0;
var counter =0;

var min = 0;
var max =9;
var min2 = -180;
var max2 = 180;
for (i =0; i<$scope.myVariants.length;i++)
{
        if ($scope.patientVariants[0].Mutation1==$scope.myVariants[i].AAMutation)
        {
          console.log($scope.patientVariants[0].Mutation1);
          trace1.r[count]=5;
          trace1.t[count]=180;
        /* trace1.text[count]="Mutation: "+ $scope.myVariants[i].Mutation+"\n"+
         "ID: "+$scope.myVariants[i].ID;

          trace1.marker.color[count]='rgb(237, 250, 90)';
          trace1.marker.size[count]=($scope.myVariants[i].Count);*/
        }

        else {
        //  trace1.marker.color[count]='rgb(144,195,212)';


          var xvalues =0;

          trace1.r[count]= Math.random() * (max - min) + min;



        //  console.log(trace1.x[count]);
          trace1.t[count]=  Math.random() * (max2 - min2) + min2;}

        //  console.log(trace1.t[count]);
        //console.log(trace1.y[count]);
    /*   trace1.text[count]="Mutation: "+ $scope.myVariants[i].Mutation+"\n"+
       "ID: "+$scope.myVariants[i].ID;*/
        //console.log(trace1.text[count]);

        //trace1.mode[count]= 'markers';
        //console.log(trace1.mode[i]);


      /*  if (count!=0)
        trace1.marker.size[count]=($scope.myVariants[i].Count);
        else {
          trace1.marker.size[count]=5;
        }

      }*/
       //console.log(trace1.marker.color[count]);
      //console.log(trace1.marker.size[count]);
      count++;
      counter +=15;

}

//console.log(trace1.y.length);
//$scope.iframeHeight = $(document).height();

var data = [trace1];


var layout = {
   //hovermode:'closest',
  title: 'TP53 Variants'+'\n\n'+'Jane Doe Mutation: '+$scope.patientVariants[0].Mutation1,
  font: {size: 15},
  plot_bgcolor: 'rgb(223, 223, 223)',
  hovermode: 'closest',

  angularaxis: {
    tickcolor: 'rgb(253,253,253)',
    visible: false

}

};


$(document).ready(function(){

Plotly.plot(document.getElementById("tester"), data, layout);

var myPlot = document.getElementById('tester');

var d3 = Plotly.d3;

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
/*myPlot.on('plotly_hover', function(data){
    //d3 = Plotly.d3;
  console.log("hello");

    div.transition()
    .duration(200)
    .style("opacity", .9);
    div.html("hello")
    .style("left", (170)+ "px")
    .style("top", 450 + "px");
})
 myPlot.on('plotly_unhover', function(data){
   div.transition()
   .duration(500)
   .style("opacity", 0);
   div.disable();

});*/
var hoverInfo = document.getElementById('hoverinfo');
myPlot.on('plotly_hover', function(data){

    var infotext = data.points.map(function(d){
      return ('hello'+' x= '+d.x+', y= '+d.y.toPrecision(3));
    });

    hoverInfo.innerHTML = infotext.join('');
})
 .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = '';
});

 })
});

})

.controller('bRAFGeneVariantsCtrl', function($scope, $http) {



})

.controller('eGFRGeneVariantsCtrl', function($scope,$http) {
  console.log("hello in function");

  var width = 500, // Set dynamically later
    height = 500,
    radius = (width / 2) - 10;

  // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
  var b = {
    w: 70,
    h: 30,
    s: 3,
    t: 10
  };

  var formatNumber = d3.format(",d");

  var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
    .range([0, radius]);

  //var color = d3.scale.category20c();

  $http.get("js/EGFRdata.php").then(function (response) {
      console.log("hello in function");
      console.log(response.data);
  //  $scope.myData = response.data.name;


var myData = response.data;

var allItems= [];
console.log(response.data.children);

for (var i =0; i< response.data.children.length;i++)
{
  allItems[i]=response.data.children[i].name;
  var k= 0;
  for (var j =i+1; j< response.data.children[i].children.length;j++)
  {

    allItems[j]= response.data.children[i].children[k].name;
    k++;
  }
}

for (var i =0; i< allItems.length;i++)
{
  console.log(allItems[i]);
}

  //var allItems = ['p.?','p.R63*', 'L1', 'drug2','drug3','L2', 'L3', 'L4'];
  var myColors = myScale(allItems.length);

  var maxTextLegendWidth = 0;
  for (i = 0; i < allItems.length; i++) {
    maxTextLegendWidth = Math.max(maxTextLegendWidth, getTextWidth(allItems[i], "12pt sans-serif"));
  }
  b.w = maxTextLegendWidth;
  width = Math.max(width, maxTextLegendWidth * 2) + 50;



  var partition = d3.layout.partition()
    .value(function(d) {
      return d.size;
    });

  var arc = d3.svg.arc()
    .startAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    })
    .endAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    })
    .innerRadius(function(d) {
      return Math.max(0, y(d.y));
    })
    .outerRadius(function(d) {
      return Math.max(0, y(d.y + d.dy));
    });

  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "container") // added
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave); // added

  // Basic setup of page elements.
  drawLegend();
  initializeBreadcrumbTrail();


  var totalSize = 0;

  var path = svg.selectAll("path")
    .data(partition.nodes(myData))
    .enter().append("path")
    .attr("d", arc)
    .text(function(d){
      return d.name
    })

    .style("fill", function(d) {
      if (d.parent == null) {
        return "#FAFAFA"
      }

      return myColors[allItems.indexOf(d.name)];
    })

    .style("stroke", function(d) {
      if (d.name== 'L1'|| d.name == 'drug2' || d.name == 'drug3')
       return myColors[1];
      })
      .style("stroke-width", function(d) {

        if (d.name== 'L1'|| d.name == 'drug2' || d.name == 'drug3')
         return "10px";
        })

    .on("click", click)
  //  .on("mouseover", mouseover)
   .on("mouseover", mouseover) // added
    .append("title")
    .text(function(d) {
      return d.name;
      console.log(d.name);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "100px")
    .attr("fill", "red")
    .classed("tooltip", true);

  totalSize = path.node().__data__.value;

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Fade all but the current sequence, and show it in the breadcrumb trail.
  function mouseover(d) {

    div.transition()
    .duration(20)
    .style("opacity", 1.5)
    .text(d.name);
    div.html(d.name)
    .style("left", (170)+ "px")
    .style("top", 370 + "px");
    var percentage = (100 * d.value / totalSize).toPrecision(3);
    var percentageString = percentage + "%";
    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    var sequenceArray = getAncestors(d);
    updateBreadcrumbs(sequenceArray, percentageString);


    // Fade all the segments.
    d3.selectAll("path")
      .style("opacity", 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    console.log(sequenceArray)
    svg.selectAll("path")
      .filter(function(node) {
        return (sequenceArray.indexOf(node) >= 0);
      })
      .style("opacity", 1);
  }

  // Given a node in a partition layout, return an array of all of its ancestor
  // nodes, highest first, but excluding the root.
  function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  // Restore everything to full opacity when moving off the visualization.
  function mouseleave(d) {

    div.transition()
    .duration(500)
    .style("opacity", 0);
    div.disable();
    // Hide the breadcrumb trail
    d3.select("#trail")
      .style("visibility", "hidden");

    // Deactivate all segments during transition.
    //d3.selectAll("path").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")

      .style("opacity", 1)
  }

  function click(d) {
    svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
        };
      })
      .selectAll("path")
      .attrTween("d", function(d) {
        return function() {
          return arc(d);
        };
      })

  }

  function computeTextRotation(d) {
                 var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
                 return (ang > 90) ? 180 + ang : ang;
             }

  function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
      .attr("id", "endlabel")
      .style("fill", "#000");
  }

  // Generate a string that describes the points of a breadcrumb polygon.
  function breadcrumbPoints(d, i) {
    var points = [];
    var widthForThisLabel = b.w;

    points.push("0,0");
    points.push(widthForThisLabel + ",0");
    points.push(widthForThisLabel + b.t + "," + (b.h / 2));
    points.push(widthForThisLabel + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
      points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
  }


  function drawLegend() {

    // Dimensions of legend item: height, spacing, radius of rounded rect. width will be set dynamically
    var li = {
      h: 30,
      s: 3,
      r: 3
    };


    li.w = maxTextLegendWidth;


    var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(myColors).length * (li.h + li.s));

    var labelVsColors = {};

    for (i = 0; i < allItems.length; i++) {
      labelVsColors[allItems[i]] = myColors[i];
    }

    var g = legend.selectAll("g")
      .data(d3.entries(labelVsColors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * (li.h + li.s) + ")";
      });

    g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) {
        return d.value;
      }).on("mouseover", function(d){
        div.transition()
          .duration(200)
          .style("opacity", .9);
          div.html(d.name)


        var nodes = flatten(myData);
        var n = nodes.find(function(d1){ return (d1.name == d.key)});
        mouseover(n);
      }).on("mouseleave", mouseleave);

    g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text(function(d) {
        return d.key;
      });
  }

  // Update the breadcrumb trail to show the current sequence and percentage.
  function updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) {
        return d.name;
      });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) {
        return myColors[allItems.indexOf(d.name)];
      });


    entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.name;
      });

    // Set position for entering and updating nodes.
    g.attr("transform", function(d, i) {
      return "translate(" + i * (b.w + b.s) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length) * (b.w + b.s) + b.t)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "left")
      //.text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
      .style("visibility", "");

  }

  d3.select(self.frameElement).style("height", height + "px");


  function myScale(steps) {
    var colors, cols, cs, i, j, len, ref, t;
    //colors = 'orange, deeppink, darkred'.replace(/(, *| +)/g, ',').split(',');
    colors = 'blue, yellow, red, green'.replace(/(, *| +)/g, ',').split(','); //#337AB7 is the same as the blue button in Bootstrap
    if (steps == 1) { // The original code had a bug in case of a one step scale. In that case I simply return the first element of the colors array
      return [colors[0]];
    }
    colors = chroma.bezier(colors);
    cs = chroma.scale(colors).mode('lab').correctLightness(true);
    cols = [];
    cols=["#0084A9","FFFF15","FF002E","#008400","#008400","FF002E","FF002E","#008400"]
    return cols;
  }

  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  };

  function flatten(root) {
    var nodes = [],
      i = 0;

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }


})

})

.controller('CDH1Ctrl', function($scope, $http) {
  console.log("hello in function");

  var width = 500, // Set dynamically later
    height = 500,
    radius = (width / 2) - 10;

  // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
  var b = {
    w: 70,
    h: 30,
    s: 3,
    t: 10
  };

  var formatNumber = d3.format(",d");

  var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

  var y = d3.scale.sqrt()
    .range([0, radius]);

  //var color = d3.scale.category20c();


  var myData = {
    "name": "Hover for more info",
    "children": [{
      "name": "p.R63*",
      "children": [{
        "name": "L1",
        "size":50
        }
      , {
        "name": "drug2",
        "size": 50
      }, {
        "name": 'drug3',
        "size": 50
      }]
    }, {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    },
    {
      "name": "p.?",
      "children": [{
        "name": "L2",
        "size": 50
      }, {
        "name": "L4",
        "size": 50
      }]
    }]

  };

  var allItems = ['p.?','p.R63*', 'L1', 'drug2','drug3','L2', 'L3', 'L4'];
  var myColors = myScale(allItems.length);

  var maxTextLegendWidth = 0;
  for (i = 0; i < allItems.length; i++) {
    maxTextLegendWidth = Math.max(maxTextLegendWidth, getTextWidth(allItems[i], "12pt sans-serif"));
  }
  b.w = maxTextLegendWidth;
  width = Math.max(width, maxTextLegendWidth * 2) + 50;



  var partition = d3.layout.partition()
    .value(function(d) {
      return d.size;
    });

  var arc = d3.svg.arc()
    .startAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
    })
    .endAngle(function(d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
    })
    .innerRadius(function(d) {
      return Math.max(0, y(d.y));
    })
    .outerRadius(function(d) {
      return Math.max(0, y(d.y + d.dy));
    });

  var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "container") // added
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave); // added

  // Basic setup of page elements.
  drawLegend();
  initializeBreadcrumbTrail();


  var totalSize = 0;

  var path = svg.selectAll("path")
    .data(partition.nodes(myData))
    .enter().append("path")
    .attr("d", arc)
    .text(function(d){
      return d.name
    })

    .style("fill", function(d) {
      if (d.parent == null) {
        return "#FAFAFA"
      }

      return myColors[allItems.indexOf(d.name)];
    })

    .style("stroke", function(d) {
      if (d.name== 'L1'|| d.name == 'drug2' || d.name == 'drug3')
       return myColors[1];
      })
      .style("stroke-width", function(d) {

        if (d.name== 'L1'|| d.name == 'drug2' || d.name == 'drug3')
         return "10px";
        })

    .on("click", click)
  //  .on("mouseover", mouseover)
   .on("mouseover", mouseover) // added
    .append("title")
    .text(function(d) {
      return d.name;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "100px")
    .attr("fill", "red")
    .classed("tooltip", true);

  totalSize = path.node().__data__.value;

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Fade all but the current sequence, and show it in the breadcrumb trail.
  function mouseover(d) {

    div.transition()
    .duration(20)
    .style("opacity", 1.5)
    .text(d.name);
    div.html(d.name)
    .style("left", (170)+ "px")
    .style("top", 370 + "px");
    var percentage = (100 * d.value / totalSize).toPrecision(3);
    var percentageString = percentage + "%";
    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    var sequenceArray = getAncestors(d);
    updateBreadcrumbs(sequenceArray, percentageString);


    // Fade all the segments.
    d3.selectAll("path")
      .style("opacity", 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    console.log(sequenceArray)
    svg.selectAll("path")
      .filter(function(node) {
        return (sequenceArray.indexOf(node) >= 0);
      })
      .style("opacity", 1);
  }

  // Given a node in a partition layout, return an array of all of its ancestor
  // nodes, highest first, but excluding the root.
  function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  // Restore everything to full opacity when moving off the visualization.
  function mouseleave(d) {

    div.transition()
    .duration(500)
    .style("opacity", 0);
    div.disable();
    // Hide the breadcrumb trail
    d3.select("#trail")
      .style("visibility", "hidden");

    // Deactivate all segments during transition.
    //d3.selectAll("path").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")

      .style("opacity", 1)
  }

  function click(d) {
    svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
          yd = d3.interpolate(y.domain(), [d.y, 1]),
          yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
        };
      })
      .selectAll("path")
      .attrTween("d", function(d) {
        return function() {
          return arc(d);
        };
      })

  }

  function computeTextRotation(d) {
                 var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
                 return (ang > 90) ? 180 + ang : ang;
             }

  function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
      .attr("id", "endlabel")
      .style("fill", "#000");
  }

  // Generate a string that describes the points of a breadcrumb polygon.
  function breadcrumbPoints(d, i) {
    var points = [];
    var widthForThisLabel = b.w;

    points.push("0,0");
    points.push(widthForThisLabel + ",0");
    points.push(widthForThisLabel + b.t + "," + (b.h / 2));
    points.push(widthForThisLabel + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
      points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
  }


  function drawLegend() {

    // Dimensions of legend item: height, spacing, radius of rounded rect. width will be set dynamically
    var li = {
      h: 30,
      s: 3,
      r: 3
    };


    li.w = maxTextLegendWidth;


    var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(myColors).length * (li.h + li.s));

    var labelVsColors = {};

    for (i = 0; i < allItems.length; i++) {
      labelVsColors[allItems[i]] = myColors[i];
    }

    var g = legend.selectAll("g")
      .data(d3.entries(labelVsColors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * (li.h + li.s) + ")";
      });

    g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) {
        return d.value;
      }).on("mouseover", function(d){
        div.transition()
          .duration(200)
          .style("opacity", .9);
          div.html(d.name)


        var nodes = flatten(myData);
        var n = nodes.find(function(d1){ return (d1.name == d.key)});
        mouseover(n);
      }).on("mouseleave", mouseleave);

    g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text(function(d) {
        return d.key;
      });
  }

  // Update the breadcrumb trail to show the current sequence and percentage.
  function updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) {
        return d.name;
      });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) {
        return myColors[allItems.indexOf(d.name)];
      });


    entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.name;
      });

    // Set position for entering and updating nodes.
    g.attr("transform", function(d, i) {
      return "translate(" + i * (b.w + b.s) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length) * (b.w + b.s) + b.t)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "left")
      //.text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
      .style("visibility", "");

  }

  d3.select(self.frameElement).style("height", height + "px");


  function myScale(steps) {
    var colors, cols, cs, i, j, len, ref, t;
    //colors = 'orange, deeppink, darkred'.replace(/(, *| +)/g, ',').split(',');
    colors = 'blue, yellow, red, green'.replace(/(, *| +)/g, ',').split(','); //#337AB7 is the same as the blue button in Bootstrap
    if (steps == 1) { // The original code had a bug in case of a one step scale. In that case I simply return the first element of the colors array
      return [colors[0]];
    }
    colors = chroma.bezier(colors);
    cs = chroma.scale(colors).mode('lab').correctLightness(true);
    cols = [];
    cols=["#0084A9","FFFF15","FF002E","#008400","#008400","FF002E","FF002E","#008400"]
    return cols;
  }

  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  };

  function flatten(root) {
    var nodes = [],
      i = 0;

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }

})
