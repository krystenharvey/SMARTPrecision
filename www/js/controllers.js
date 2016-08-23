

angular.module('app.controllers', [])

.controller('homeCtrl', function($scope) {

})

.controller('cloudCtrl', function($scope) {

})

.controller('janeDoeCtrl', function($scope) {

  $scope.GotoLink = function (url) {
   window.open(url,'_system');
 }


   $scope.myGoBack = function() {
     $ionicHistory.goBack();
   };

})

.controller('patientsCtrl', function($scope) {

})

.controller('tP53GeneVariantsCtrl', function($scope, $http,$ionicHistory) {

  $scope.GotoLink = function (url) {
   window.open(url,'_system');
 }


   $scope.myGoBack = function() {
     $ionicHistory.goBack();
   };



  // Initial execution if needed


  console.log($(window).width());


  function renderBubbleGraph(data){
    function draw(){
      var div = d3.select("#hoverinfo");

      var margin = {top: 20, right: 100, bottom: 50, left: 60},

      width = $("#tester").width()-margin.right-margin.left;
     height = $("#tester").height()-margin.top-margin.bottom;




  /*  width = $('#tester').width();
  //  width=
    //height = 500 - margin.top - margin.bottom;
    height =600- margin.top - margin.bottom;
    console.log(width +"  "+height);*/


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


console.log(values[0]);
/*for (var i =0; i<$scope.myVariants.length; i++)
{
  if (i ==0|| $scope.myVariants[i].CosmicID ==  96438 ||i ==$scope.myVariants.length-1)
  values[i]= values[i];

  else {
    values[i]="";
  }
} */

console.log(data);

      var xValue = function(d) { return d.Position;}, // data -> value
          xScale = d3.scale.linear().range([0, width]), // value -> display
          xMap = function(d) { return xScale(xValue(d));}, // data -> display
          xAxis = d3.svg.axis().scale(xScale).ticks($scope.myVariants.length).tickValues(values).orient("bottom").tickFormat(function(d) {
              if (d== values[0] || d==220||d==values[values.length-1])
              {
                console.log(d);
                return d;
              }
              else {
                {
                  return "";
                }
              }
             })

      // setup y
      var yValue = function(d) { return d.Count;}, // data -> value
          yScale = d3.scale.linear().range([height, 0]), // value -> display
          yMap = function(d) { return yScale(yValue(d));}, // data -> display
          yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(10);

      var svg = d3.select("#tester").append("svg")
    .attr("width", width+ margin.left + margin.right)
    .attr("height", height+ margin.top + margin.bottom)
    .style("background-color", '#DFDFDF')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

      // x-axis
      svg.selectAll('text')
      .style("font-size", function(d)
      {
        console.log(d.Position);
      if (d.Position !=values[0])
      {
          return '0px'
      }
    })
      svg.append("g")

          .data(data)
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width/2)
          .attr("y", 40)
          .style("text-anchor", "end")
          .style("font-size", '12px')
          .text("Position(AA)");

      // y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr('x',-((width/2)-margin.left-margin.right))
          .attr("y", -50)
          .attr("dy", ".71em")
          .style("text-anchor", "bottom")
          .text("Frequency");


          svg.append("g")
                  .attr("class", "grid")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis
                      .tickSize(-height-20, 0, 0)
                      .tickFormat("")
                  )


    color = d3.scale.linear().domain([1,50])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#007AFF"), d3.rgb('#8b0000')] );

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

var para = document.createElement("P");
var textnode = document.createTextNode("Displayed are the top "+$scope.myVariants.length+" EGFR variants for Adenocarcinoma positioned in AA order.");
var para = document.createElement("P");
 var textnode2 = document.createTextNode(" Patient variant is highlighted in yellow.");         // Create a text node
para.appendChild(textnode);
para.appendChild(textnode2);
document.getElementById("descrip").appendChild(para);


color = d3.scale.linear().domain([1,50])
  .interpolate(d3.interpolateHcl)
  .range([d3.rgb('#8b0000'), d3.rgb("#007AFF")] );


 //d3.select("#tester").append("svg")
 //var legend = d3.select("#legend").append("svg")

 // Dimensions of legend item: height, spacing, radius of rounded rect. width will be set dynamically
 var li = {
   h: 30,
   s: 3,
   r: 0
 };
 console.log(color(4));
 Labels =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,
   29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,45,46,47,48,49,50];

 var legend = d3.select("#legend").append("svg:svg")
     .attr("width", 50)
     .attr("height", height+margin.top+margin.bottom+100);

   var labelVsColors = {};

   for (i = 0; i < 50; i++) {
     labelVsColors[Labels[i]] = color(i);
   }

 var g = legend.selectAll("g")
   .data(d3.entries(labelVsColors))
   .enter().append("svg:g")
   .attr("transform", function(d, i) {
     return "translate(0," + i * (9) + ")";
   });

 g.append("svg:rect")
   .attr("rx", li.r)
   .attr("ry", li.r)
   .attr("width", 50)
   .attr("height", 40)
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

       if(d.key==1 ||d.key==50)
       {
         return '#000000'
       }
       return '#ffffff'
     })
     .text(function(d) {


     });


});
}
draw();
}

$(window).resize(function() {
  $.getJSON('js/TP53.json', function(data) {
      renderBubbleGraph(data.records);
  });

});

                        $(document).ready(function() {

                        $.getJSON('js/TP53.json', function(data) {
                            renderBubbleGraph(data.records);
                        }); })



})

.controller('pIK3CAGeneVariantsCtrl', function($scope,$http) {



})

.controller('bRAFGeneVariantsCtrl', function($scope, $http) {


})

.controller('eGFRGeneVariantsCtrl', function($scope, $http) {
  $scope.GotoLink = function (url) {
   window.open(url,'_system');
 }


   $scope.myGoBack = function() {
     $ionicHistory.goBack();
   };

  $scope.$applyAsync()
  //sets width and height and radius of actual graph
     var width = 550,
     height = 530,
     radius = 550/2;

     //
     var x = d3.scale.linear()
     .range([0, 2 * Math.PI]);

     var y = d3.scale.linear()
     .range([0, radius]);




     var svg = d3.select("#chart").append("svg")
     .attr("width", width)
     .attr("height", 600)
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
     var textnode = document.createTextNode("Displayed are the top "+total+" EGFR variants for Adenocarcinoma.");
     //var para = document.createElement("P");
    // var textnode2 = document.createTextNode(" They are positioned by their AA order.");         // Create a text node
     para.appendChild(textnode);
     //para.appendChild(textnode2);
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
                 return 'yellow'
               }
               if (d.Response == 'Sensitive')
               {
                 return ('#2166ac')
               }

               if (d.Response =="Resistant")
                   {
                   return ('#b2182b')
                 }

               if(d.Response=="Predicted-Sensitive")
               {
                 return('67a9cf')
               }
               if(d.Response=="Predicted-Resistant")
               {
                 return('#ef8a62')
               }
               if ((d.Response =='n/a' && d.children==null))
               {
                 return ('#000000')
               }
               if(d.Response== 'Decreased-Response')
               {
                 return '#fddbc7'
               }

               else
                 {
                   return ('lightgrey')
                 }

              })

              .style("stroke", function(d,i) {
                var childrenlength = 0;

                 if (d.ID==12979)
                 {
                   var t = i;
                   childrenlength = d.children.length;

                   console.log(t);
                   console.log(childrenlength);

                     return  '#ffff00'
                 }
                else{
                  return ('darkgrey')
                }


                 })
                 .style("stroke-width", function(d,i) {


                   })
             .on("click", click)
             .on("dblclick",dblclick)
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

             var text = g.append("text");


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

})
  text.attr('text-anchor', function (d) { return computeTextRotation2(d) > 180 ? "end" : "start"; })

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

    if(d.Position!=null && d.ID!=12979)
    {
      return d.Position;
    }
    if(d.ID==12979)
    {
      return d.name;
    }

})}

function resetText2()
{

    text.attr("transform", function(d) { return "translate(" + (arc.centroid(d)) + ")rotate(" + computeTextRotation2(d) + ")";})
    text.attr('text-anchor', function (d) { return computeTextRotation2(d) > 180 ? "end" : "start"; })

    text.attr("pointer-events", "none")
    text.style("font-size",function(d){

      if (d.ID!=12979)
      {
        return ("7px")
      }
      else {
        return ("7px")
      }

    })
    text.text(function(d) {

      if(d.Position!=null && d.ID!=12979)
      {
        return d.name;
      }
      if(d.ID==12979)
      {
        return d.name;
      }

  })}


var checker =false;



             function click(d) {
             // fade out all text elements

             div.transition()
             .duration(75)
             .style("opacity", .9)



             if (d.classifier != "Title")
           {
             if (d.classifier =='Variant')
             {
               div.style('font-size','25px');
               div.html(d.classifier+": "+ d.name);
             }

             if(d.classifier =='drug-name')
             {
                div.style('font-size','15px');
                div.html("Drug: "+ d.name+ "<br/>Response:"+ d.Response+"<br/>Approach: "+ d.Approach+"<br/>Evidence: "+ d.Evidence)
             }

             updateText();
             text.transition().attr("opacity", 0);

             path.transition()
             .duration(750)
             .attrTween("d", arcTween(d))
             .each("end", function(e, i) {
                   // check if the animated element's data e es within the visible angle span given in d
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
             if (checker==true)
             {
               checker = false;
               dblclick();
               return;
             }

             div.style('font-size','15px');
             div.html('Click for more details on variants and drugs.')
             text.transition().attr("opacity", 0);

             path.transition()
             .duration(750)
             .attrTween("d", arcTween(d))
             .each("end", function(e, i) {
               console.log(d.x)
                   // check if the animated element's data e lies within the visible angle span given in d
                   if (e.x >= d.x && e.x < (d.x + d.dx)) {
                   var arcText = d3.select(this.parentNode).select("text");
                   // fade in the text element and recalculate positions
                   arcText.transition().duration(750)
                   .attr("opacity", 1)
                   .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation2(d) + ")"; })

                   .attr('text-anchor', function (d) { return computeTextRotation(d) > 180 ? "end" : "start"; })

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

var myColors = ['yellow', 'lightgrey', '#2166ac','#67a9cf','#b2182b','#ef8a62','#fddbc7','#000000']
var Responses = ['Variant Detected in Patient','Variant not Detected', '   Sensitive', '   Predicted-Sensitive','   Resistant','   Predicted-Resistant','   Decreased-Response','Unknown'];

  li.w = myColors.length;


  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", 300)
      .attr("height", 25*(Responses.length));

    var labelVsColors = {};

    for (i = 0; i < myColors.length; i++) {
      labelVsColors[Responses[i]] = myColors[i];
    }

    var g = legend.selectAll("g")
      .data(d3.entries(labelVsColors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
        return "translate(0," + i * (25) + ")";
      });

    g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", 300)
      .attr("height", 25)
      .style("fill", function(d) {
        return d.value;
      })

    g.append("svg:text")
      .style('align','center')
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




var width = 600,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { console.log(d.Count); return d.Count; });

var svg = d3.select("#myDiv").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
function getHover(){
  $(document).ready(function() {

  var div = document.getElementById('#hoverinfo');
  return div;
})

}


d3.json("js/CDH1data.json", function(error, data) {
  $scope.GotoLink = function (url) {
   window.open(url,'_system');
 }


   $scope.myGoBack = function() {
     $ionicHistory.goBack();
   };



var length = data.records.length;

var para = document.createElement("P");
var textnode = document.createTextNode("Displayed are the top "+length+" KRAS variants for Adenocarcicoma.");
var para = document.createElement("P");
 var textnode2 = document.createTextNode(" Patient variant is highlighted in yellow.");         // Create a text node
para.appendChild(textnode);
para.appendChild(textnode2);
document.getElementById("descrip").appendChild(para);

var color = d3.scale.category20c();

console.log(data.records);

  var g = svg.selectAll(".arc")
      .data(pie(data.records))
     .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .data(data.records)
      .on('click',click)
      .style("fill", function(d) {

        if (d.ID ==517)
        {
          return '#ffff00'
        }

        return color(d.Count); });



  g.append("text")
      .data(data.records)

      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style('textcolor','#ffff00')
      .style('font-size','15px')
      .text(function(d) { console.log(d.AAMutation);

        if (d.ID ==517)
        {
          return 'Patient variant highlighted: '+d.AAMutation;
        }
 });

 var div2 = d3.select('#hoverinfo');
4
 function click(d) {
 // fade out all text elements
 div2.transition()
 .duration(75)
 .style("opacity", .9)
 div2.html('Gene: KRAS'+'<br/>AA Mutation: '+d.AAMutation+'<br/>CDS Mutation: '+d.CDSMutation+'<br/>Count: '+d.Count+'<br/>Position: '+d.Position+'<br/>Drug Info: '+d.Drugs);
}

});


function type(d) {
  d.Count = +d.Count;
  return d;
}

})
