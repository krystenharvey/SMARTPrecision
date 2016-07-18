

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


};



$(document).ready(function(){

Plotly.plot(document.getElementById("tester"), data, layout, {displayModeBar: false});

var myPlot = document.getElementById('tester');

var d3 = Plotly.d3;

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

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


})

.controller('bRAFGeneVariantsCtrl', function($scope, $http) {


})

.controller('eGFRGeneVariantsCtrl', function($scope, $http) {
  //sets width and height and radius of actual graph
  var width = 500,
     height = 500,
     radius = Math.min(width, height) / 2;

     //
     var x = d3.scale.linear()
     .range([0, 2 * Math.PI]);

     var y = d3.scale.linear()
     .range([0, radius]);



     var svg = d3.select("body").append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

     var partition = d3.layout.partition()
     .value(function(d){return d.size; });

     /*Tooltip definition */
     var div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0)
     .style("right","0px");



     var dlength = 0;


     var arc = d3.svg.arc()
     .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
     .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
     .innerRadius(function(d) { return Math.max(0, y(d.y)); })
     .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

     d3.json("js/EGFRdata.json", function(error, root) {
             var g = svg.selectAll("g")
             .data(partition.nodes(root))
             .enter().append("g");

             var path = g.append("path")
             .attr("d", arc)
             .style("fill", function(d, i) {
               if(d.name=='p.L858R')
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

               else
                 {
                   return ('#0084a9')
                 }

              })

              .style("stroke", function(d,i) {
                 if (i>1 && i < 11)
                   return  '#ffff00'
                 })
                 .style("stroke-width", function(d,i) {

                   if (i>1 && i<11)
                     return  '8px'
                   })
             .on("click", click)
              /*The following two '.on' attributes for tooltip*/
             .on("mouseover", function(d) {
                 div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 div.html(d.classifier+": "+ d.name+ "<br/>Response:"+ d.Response+"<br/>Approach: "+ d.Approach+"<br/>Evidence: "+ d.Evidence)



                 })
             .on("mouseout", function(d) {
                 div.transition()
                 .duration(500)
                 .style("opacity", 0);
                 });

             var text = g.append("text")
             //console.log(arc.centroid(d));
             .attr("transform", function(d) { return "translate(" + (arc.centroid(d)) + ")rotate(" + computeTextRotation(d) + ")";
             console.log(arc.centroid(d));
           })
             .attr('text-anchor', function (d) { return computeTextRotation(d) > 180 ? "end" : "start"; })
             //.attr("dx", "4") // margin
             //.attr("dy", ".25em") // vertical-align
             .attr("pointer-events", "none")
             .style("font-size",function(d){

               if (d.name!="p.L858R" || d.classifier !='n/a')
               {
                 return ("0px")
               }
               else {
                 return ("15px")
               }

             })
             .text(function(d) { return d.name; })



             function click(d) {
             // fade out all text elements
             if (d.classifier != "n/a")
           {
             text.transition().attr("opacity", 0);

             path.transition()
             .duration(750)
             .attrTween("d", arcTween(d))
             .each("end", function(e, i) {
                   // check if the animated element's data e lies within the visible angle span given in d
                   if (e.x >= d.x && e.x < (d.x + d.dx)) {
                   //  console.log(e);
                   // get a selection of the associated text element
                   var arcText = d3.select(this.parentNode).select("text");
                   // fade in the text element and recalculate positions
                   arcText.transition().duration(750)
                   .attr("opacity", 1)
                   .attr("transform", function(d) {
                     if (d.children != null)
                     {
                         return "translate(" + (arc.centroid(d)) + ")rotate(" + computeTextRotation2(d) + ")";
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
                   //.attr('text-anchor', function (d) { return computeTextRotation(d) > 180 ? "end" : "start"; })
                   .attr('text-anchor', 0 )
                   .style("font-size",function(d)
                 {

                   return "0px"


               })
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

})

.controller('CDH1Ctrl', function($scope, $http) {

})
