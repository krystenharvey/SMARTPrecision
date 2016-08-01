

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

  function getWidth()
  {

    var changer = false;
      $(window).on('orientationchange', function(event) {
            changer = true;
            if (changer == true)
            {
              location.reload();
              console.log('hello');
              return $(window).width()

            }
            else {
              {
                  console.log(hi);
                return ($(window).width())

              }
            }

          });
  }
  console.log($(window).width());

  function renderBubbleGraph(data){
      var div = d3.select("#hoverinfo");

      var margin = {top: 20, right: 100, bottom: 50, left: 60},
    width = $(window).width()- margin.left - margin.right-50,
    height = 500 - margin.top - margin.bottom;
  /*
   * value accessor - returns the value to encode for a given data object.
   * scale - maps value to a visual display encoding, such as a pixel position.
   * map function - maps from data value to display value
   * axis - sets up axis
   */
   $http.get("js/TP53.php").then(function (response) {
         //console.log("hello in function");
         $scope.myVariants = response.data.records;
         var values = [];
var ids = [];
for (var i =0; i<$scope.myVariants.length; i++)
{

  values[i]= $scope.myVariants[i].Position;

}
values.sort(function(a, b) {
  return a - b; })

var first = values[0];
var last = values[values.length-1];



/*for (var i =0; i<$scope.myVariants.length; i++)
{
  if (i ==0|| $scope.myVariants[i].CosmicID ==  96438 ||i ==$scope.myVariants.length-1)
  values[i]= values[i];

  else {
    values[i]="";
  }
} */

      var xValue = function(d) { return d.Position;}, // data -> value
          xScale = d3.scale.linear().range([0, width]), // value -> display
          xMap = function(d) { return xScale(xValue(d));}, // data -> display
          xAxis = d3.svg.axis().scale(xScale).ticks(20).tickValues(values).orient("bottom");

      // setup y
      var yValue = function(d) { return d.Count;}, // data -> value
          yScale = d3.scale.linear().range([height, 0]), // value -> display
          yMap = function(d) { return yScale(yValue(d));}, // data -> display
          yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(10);

      var svg = d3.select("#tester").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", '#DFDFDF')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

      // x-axis
      svg.append("g")
          .data(values)
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .style("font-size", function(d)
          {
            if (d == 62)
            {
              return '10px'
            }
            else{
              ('0px')
            }
        })

          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width/2)
          .attr("y", 40)
          .style("text-anchor", "end")
          .style("font-size", '12px')

          .text("Postion(AA)");

      // y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr('x',-(width/2))
          .attr("y", -50)
          .attr("dy", ".71em")
          .style("text-anchor", "bottom")
          .text("Frequency");


          svg.append("g")
                  .attr("class", "grid")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis
                      .tickSize(-height, 0, 0)
                      .tickFormat("")
                  )

                    //.tickFormat(function(d) {return abbreviate(d,0,false,'K'); });





/*var colorbrewer= {MaRed:{9:['#fff7fb','#ece2f0','#d0d1e6','#a6bddb','#67a9cf','#3690c0','#02818a','#016c59','#014636']}}
var o = d3.scale.ordinal()
    .domain(["foo", "bar", "baz"])
    .range(colorbrewer.MadRed[9]);*/

    color = d3.scale.linear().domain([1,50])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#007AFF"), d3.rgb('#8b0000')]);

      console.log(color(color.length));
//come back and put max



                        svg.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr("class", "bubble")
                            .attr("cx", xMap)
                            .attr("cy", yMap)
                            .style('opacity',0.7)
                            .style('fill',function(d)
                            {



                              return color(d.Count)})

                              .style('stroke', function(d)
                            {

                                if (d.CosmicID==96438)
                                {
                                  console.log('hi');
                                  return ('rgb(237, 250, 90)')
                                }
                                return('#FFFFFF')
                            })
                            .style('stroke-width', function(d)
                          {

                              if (d.CosmicID==96438)
                              {

                                return (7)
                              }
                              return(2)
                          })
                            //.transition()
                            //.duration(800)
                            .attr("r", 15)
                            .on('click',function (d)
                              {
                                div.html('Gene: TP53'+'<br/>AA Mutation: '+d.AAMutation+'<br/>CDS Mutation: '+d.CMutation+'<br/>Position: '+d.Position+'<br/>Resistance: '+d.Resistant+'<br/>Sensitivity: '+d.Sensitive+"<br/>Count in COSMIC: "+d.Count);
                              });

var r = 500;

 //d3.select("#tester").append("svg")
  var legend = d3.select("#legend").append("svg")
  .attr("class", "legendLinear")

  .style("right",'0px')
  .attr("width", 50)
  .attr("height", 800)
  .selectAll("g")
  .data(data)
  .enter().append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("width", 40)
  .attr("height", 60)
  .style("fill", function(d, i) {

   return (color(i));
//  console.log(color(i));

     });


  /*  // var d3 = require('d3')
 var legend = require('d3-svg-legend/no-extend')

 var svg = d3.select("#legend");

 var quantize = d3.scale.quantize()
     .domain([ 0, 0.15 ])
     .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

 svg.append("g")
   .attr("class", "legendQuant")
   .attr("transform", "translate(20,20)");

 var colorLegend = legend.color()
     .labelFormat(d3.format(".2f"))
     .useClass(true)
     .scale(quantize);

 svg.select(".legendQuant")
   .call(colorLegend);*/

});
}

                        $(document).ready(function() {

                        $.getJSON('js/TP53.json', function(data) {
                            renderBubbleGraph(data.records);
                        }); })



})

.controller('pIK3CAGeneVariantsCtrl', function($scope,$http) {
  /*function click(d) {
  alert('hello');
}

function reset() {
  svg.selectAll(".active").classed("active", active = false);
}

function getWidth()
{

  var changer = false;
    $(window).on('orientationchange', function(event) {
          changer = true;
          location.reload();
          return ($(window).width()+"px")


        });

}
function renderBubbleGraph(data){

// define some variables for the bubble chart
    var w = parseInt(getWidth(), 10),
        h = 500,
        margin = {top: 48, right: 48, bottom: 48, left: 72};

    var svg = d3.select("#tester")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    var x = d3.scale.linear().domain([0, 50]).range([margin.left, w-margin.right]),
        y = d3.scale.linear().domain([0, 80000]).range([h-margin.bottom, margin.top]);

    var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient("bottom")
                      .ticks(5),

        yAxis = d3.svg.axis()
                      .scale(y)
                      .orient("left")
                      .ticks(10)
                      .tickFormat(function(d) {return abbreviate(d,0,false,'K'); });
    //bubble radius range and scale
    var max_r = d3.max(data.map(
                           function (d) { return d.Size; })),
            r = d3.scale.linear()
                .domain([0, d3.max(data, function (d) { return d.Size; })])
                .range([0, 80]);

    //start drawing the chart
    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0, "+(h-margin.bottom)+")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate("+(margin.left)+", 0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "loading")
        .text("Loading ...")
        .attr("x", function () { return w/2; })
        .attr("y", function () { return h/2-5; });

    svg.selectAll(".loading").remove();

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("cx", function (d) { return x(d.Position);})
        .attr("cy", function (d) { return y(d.Count);})
        .transition()
        .duration(800)
        .attr("r", 15)
        .on("click", function(d){click(d)});

}
$(document).ready(function() {

    $.getJSON('js/TP53.json', function(data) {
        renderBubbleGraph(data);
    });

});*/


})

.controller('bRAFGeneVariantsCtrl', function($scope, $http) {


})

.controller('eGFRGeneVariantsCtrl', function($scope, $http) {
  $scope.$applyAsync()
  //sets width and height and radius of actual graph
     var width = 550,
     height = 600,
     radius = Math.min(width, height) / 2;

     //
     var x = d3.scale.linear()
     .range([0, 2 * Math.PI]);

     var y = d3.scale.linear()
     .range([0, radius]);



     var svg = d3.select("#chart").append("svg")
     .attr("width", width)
     .attr("height", height+100)

     .append("g")
     .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

     var partition = d3.layout.partition()
     .value(function(d){return d.size});

     /*Tooltip definition */
     var div = d3.select("#hoverinfo")
     .style("opacity", 0)
     //.style("right","0px");

     //define description
     var total=0;
     $http.get("js/EGFRtwo.json").then(function (response) {
       $scope.totalvariants = response.data;
      total = $scope.totalvariants.children.length;
      console.log($scope.totalvariants.children.length);



     var para = document.createElement("P");
     var textnode = document.createTextNode("Displayed are the top "+total+" EGFR variants for non-small lung carcicoma diagnosis.");
     //var para = document.createElement("P");
     var textnode2 = document.createTextNode(" They are positioned by their AA order.");         // Create a text node
     para.appendChild(textnode);
     para.appendChild(textnode2);
     document.getElementById("descrip").appendChild(para);

     var dlength = 0;


     var arc = d3.svg.arc()
     .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
     .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
     .innerRadius(function(d) { return Math.max(0, y(d.y)); })
     .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

     d3.json("js/EGFRtwo.json", function(error, root) {
             var g = svg.selectAll("g")
             .data(partition.nodes(root))
             .enter().append("g");


             var path = g.append("path")
             .attr("d", arc)
             .style("fill", function(d, i) {
               if(d.ID==12979)
               {
                 return '#ffff00'
               }
               if (d.Response == 'Sensitive')
               {
                 return ('#32cd32')
               }

               if (d.Response =="Resistant")
                   {
                   return ('#FF0000')
                 }

               if(d.Response=="Predicted-Sensitive")
               {
                 return('#90ee90')
               }
               if(d.Response=="Predicted-Resistant")
               {
                 return('#ffb6c1')
               }
               if ((d.Response =='n/a' && d.children==null))
               {
                 return ('#000000')
               }
               if(d.Response== 'Decreased-Response')
               {
                 return '#b784a7'
               }

               else
                 {
                   return ('#0084a9')
                 }

              })

              .style("stroke", function(d,i) {
                 if (d.ID==12979)
                   return  '#ffff00'
                 })
                 .style("stroke-width", function(d,i) {

                   if (i>1 && i<11)
                     return  '8px'
                   })
             .on("click", click)
              /*The following two '.on' attributes for tooltip*/
             .on("mouseover", function(d) {
              /*   div.transition()
                 .duration(75)
                 .style("opacity", .9)

                 div.html(d.classifier+": "+ d.name+ "<br/>Response:"+ d.Response+"<br/>Approach: "+ d.Approach+"<br/>Evidence: "+ d.Evidence)*/
               })
             .on("mouseout", function(d) {
                 /*div.transition()
                 .duration(500)
                 .style("opacity", 0);*/
                 });

             var text = g.append("text")
             resetText();


function updateText()
{
  text.text(function(d){
    if(d.two_words!=null)
    {
      return d.two_words;
    }
    return d.name;
  })
}
function resetText()
{

  text.attr("transform", function(d) { return "translate(" + (arc.centroid(d)) + ")rotate(" + computeTextRotation2(d) + ")";
 // console.log(arc.centroid(d));
})
  text.attr('text-anchor', function (d) { return computeTextRotation2(d) > 180 ? "end" : "start"; })
  //.attr("dx", "4") // margin
  //.attr("dy", ".25em") // vertical-align
  text.attr("pointer-events", "none")
  text.style("font-size",function(d){

    if (d.ID!=12979)
    {
      return ("7px")
    }
    else {
      return ("15px")
    }

  })
  text.text(function(d) {

    if(d.Position!=null &&d.ID!=12979)
    {
      //return d.Position;
    }
    if(d.ID==12979)
    {
      return d.name;
    }

})}


             function click(d) {
             // fade out all text elements
             div.transition()
             .duration(75)
             .style("opacity", .9)

             div.html(d.classifier+": "+ d.name+ "<br/>Response:"+ d.Response+"<br/>Approach: "+ d.Approach+"<br/>Evidence: "+ d.Evidence)

             if (d.classifier != "Title")
           {
             updateText();
             text.transition().attr("opacity", 0);

             path.transition()
             .duration(750)
             .attrTween("d", arcTween(d))
             .each("end", function(e, i) {
                   // check if the animated element's data e lies within the visible angle span given in d
                   console.log(d.x)
                   if (e.x >= d.x && e.x < (d.x + d.dx)) {
                   //  console.log(e);
                   // get a selection of the associated text element
                   var arcText = d3.select(this.parentNode).select("text");
                   // fade in the text element and recalculate positions
                   arcText.transition().duration(750)
                   .attr("opacity", 1)
                   .attr("transform", function(d) {
                     if (d.children != null)
                  //   console.log(arc.centroid(d))
                     {
                       console.log(arc.centroid(d))
                         return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")";
                     }

                     else {
                       return "translate(" + (arc.centroid(d)) + ")rotate(" + computeTextRotation(d) + ")";

                     }

                 })
                   .attr('text-anchor', function (d) { return computeTextRotation(d) > 180 ? "end" : "start"; })
                   .style("font-size",function(d)
                 {
                   if (d.children==null)
                   {
                   //console.log(d.children[0].classifier);
                   return "15px"


                 }
                 if (d.children[0].classifier=='drug-name')
                 {
                 //console.log(d.children[0].classifier);
                 return "20px"


               }
               })
                   }
                   });
             }
           else
           {
             text.transition().attr("opacity", 0);

             path.transition()
             .duration(750)
             .attrTween("d", arcTween(d))
             .each("end", function(e, i) {
               console.log(d.x)
                   // check if the animated element's data e lies within the visible angle span given in d
                   if (e.x >= d.x && e.x < (d.x + d.dx)) {
                   //  console.log(e);
                   // get a selection of the associated text element
                   var arcText = d3.select(this.parentNode).select("text");
                   // fade in the text element and recalculate positions
                   arcText.transition().duration(750)
                   .attr("opacity", 1)
                   .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation2(d) + ")"; })
                   //.attr("transform", function(d) { return computeTextRotation(d,i)})
                   .attr('text-anchor', function (d) { return computeTextRotation(d) > 180 ? "end" : "start"; })
                  // .attr('text-anchor', 5 )
                  resetText();


                   }
                   });
             }

           }
             });

     d3.select(self.frameElement).style("height", height + "px");



     // Interpolate the scales!
     function arcTween(d) {
         var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
         yd = d3.interpolate(y.domain(), [d.y, 1]),
         yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
         return function(d, i) {
             return i
             ? function(t) { return arc(d); }
             : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
         };
     }

     function computeTextRotation(d) {

         //var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
     //  console.log(ang);
         //return (ang > 90) ? 180 + ang : ang;

             return (-45);

     }
     function computeTextRotation2(d) {

             return (0);

     }



function drawLegend() {
  console.log("hello");

  // Dimensions of legend item: height, spacing, radius of rounded rect. width will be set dynamically
  var li = {
    h: 30,
    s: 3,
    r: 0
  };

var myColors = ['#ffff00','#32cd32','#FF0000','#90ee90','#ffb6c1','#b784a7','#000000','#0084a9'];
var Responses = ['Patient Variant', 'Sensitive', 'Predicted\n\nSensitive','Resistant','Predicted-Resistant','Decreased-Response','Unknown','Variant'];

  li.w = myColors.length;


  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", 100)
      .attr("height", d3.keys(myColors).length*33);

    var labelVsColors = {};

    for (i = 0; i < myColors.length; i++) {
      labelVsColors[Responses[i]] = myColors[i];
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
      .attr("width", 200)
      .attr("height", 100)
      .style("fill", function(d) {
        return d.value;
      })

    g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "right")
      .style("pointer-events", "none")
      .attr("fill",function(d) {

        if(d.value!='#000000')
        {
          return '#000000'
        }
        return '#ffffff'
      })
      .text(function(d) {
        return d.key;
      });
}
drawLegend();
      });

      var myPlot = document.getElementById('chart');
      myPlot.async = false;
      console.log(myPlot.async);

      $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
          options.async = true;
      });


})

.controller('CDH1Ctrl', function($scope, $http) {

  /*$http.get("js/TP53.php").then(function (response) {
      //console.log("hello in function");
      $scope.myVariants = response.data.records;
  var data1 = {
  values: [],
  labels: [],
  type: 'pie'
};

for (var i =0; i< mLength; i++)
{
  console.log($scope.myVariants[i]);
  data1.values[i]= $scope.myVariants[i].Count;
  data1.labels[i] = $scope.myVariants[i].AAMutation;
}

var data = [data1];


function getWidth()
{

  var changer = false;
    $(window).on('orientationchange', function(event) {
          changer = true;
          location.reload();
          return ($(window).width()+"px")


        });

}

var layout = {
  height: '700px',
  width: getWidth()
};

Plotly.newPlot('myDiv', data, layout);
})*/
})
