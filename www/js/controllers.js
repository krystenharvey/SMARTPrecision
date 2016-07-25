

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
  //console.log("hello in function");


var sizes = [10,20,40,60];
var ranges = [3,6,9,12];
var colors = ['#37FDFC','#00CDCD','#388E8E','#000000'];
var names = ['very rare', 'rare', 'common','very common'];



  var trace1 = {
      overlaying:false,
      showlegend: true,
      type: 'scatter',
      hoverinfo: 'text',
      name:[],
       x: [],
       y: [],
       text: [],


       // initial text -->text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
       mode: 'markers',
       marker:{
         sizemode: "diameter",
         //sizeref: 0.0006,
         color:[],
         line: {color: 'white'},
         size: [],
         opacity:0.7}



     };
//read patient file
       $http.get("js/janedoe.php").then(function (response) {
         $scope.patientVariants = response.data.JaneDoe;
      //   console.log($scope.patientVariants[0].Mutation1);
       });

//read gene variant file
  $http.get("js/TP53.php").then(function (response) {
      //console.log("hello in function");
      $scope.myVariants = response.data.records;


//get number of different counts in top 20 TP53 Variants

var all_counts = new Array();
for (i = 0; i< $scope.myVariants.length;i++)
{
  all_counts[i]= $scope.myVariants[i].Count;
}
//var number_of_counts = $scope.myVariants.length;

var unique = all_counts.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
})

//console.log(unique.length);
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

//console.log(number_of_cohorts);

//determine number cutoff in  cohorts
//first number cutoff will always be ceil function
var cutoff = Math.floor(number_of_counts / number_of_cohorts);
var firstcutoff= Math.ceil(number_of_counts / number_of_cohorts);

//assign each count to a cohort
//console.log(cutoff+"cutoff");

//sort array of unique counts
unique.sort(function(a, b) {
  return a - b;
});





function DetermineSize(index){

var the_count = $scope.myVariants[index].Count;
var cohort_one = new Array();
var cohort_two = new Array();
var cohort_three = new Array();
var cohort_four = new Array();
for (var i =0; i< firstcutoff;i++)
{
  cohort_one[i]= unique[i];
  if (cohort_one[i]==the_count)
  {
      //console.log(the_count);
    return 0;
  }

}

if (number_of_cohorts > 1)
{
  for (var i =0; i< cutoff;i++)
  {
    cohort_two[i]= unique[i+firstcutoff];
    if (cohort_two[i]==the_count)
    {
        //console.log(the_count);
      return 1;
    }
  }
}

if (number_of_cohorts > 2)
{
  for (var i =0; i< cutoff;i++)
  {
    cohort_three[i]= unique[i+firstcutoff+cutoff];
    if (cohort_three[i]==the_count)
    {
      //console.log(the_count);
      return 2;
    }
  }
}

if (number_of_cohorts > 3)
{
  for (var i =0; i< cutoff;i++)
  {
    cohort_four[i]= unique[i+firstcutoff+cutoff+cutoff];
    if (cohort_four[i]==the_count)
    {
      //console.log(cohort_four[i]);
      return 3;
    }
  }
}

}

var myCounts = new Array();
function getLargest ()
{
  var myCounts = new Array();
  for (var i =0; i<$scope.myVariants.length;i++)
  {
    myCounts[i] = $scope.myVariants[i].Count;
  }
  myCounts.sort(function(a, b) {
    return a - b;
  });

  //console.log(myCounts[$scope.myVariants.length-1]);
  return (myCounts[$scope.myVariants.length-1]);

}

function getSmallest ()
{
  var myCounts = new Array();
  for (var i =0; i<$scope.myVariants.length;i++)
  {
    myCounts[i] = $scope.myVariants[i].Count;
  }
  myCounts.sort(function(a, b) {
    return a - b;
  });

  //console.log(myCounts[$scope.myVariants.length-1]);
  return (myCounts[0]);

}

var patientVariant= 0;
for (var i =0; i<$scope.myVariants.length;i++)
{
        if ($scope.patientVariants[0].Mutation1==$scope.myVariants[i].CosmicID)
        {
          //console.log($scope.patientVariants[0].Mutation1);
          //trace1.x[i]=5;
          patientVariant=i;


          trace1.marker.color[i]='rgb(237, 250, 90)';
        }

        else {

        //  trace1.marker.color[i]='rgb(144,195,212)';
        trace1.marker.color[i]=colors[DetermineSize(i)];

      }

      trace1.marker.size[i]=  20;
      //(10*$scope.myVariants[i].Count)/getSmallest();
      //sizes[DetermineSize(i)];
      trace1.name[i]= names[DetermineSize(i)];
      console.log(trace1.name[i]);
      //console.log(trace1.marker.size[i]);
      //trace1.name[i]=  names[DetermineSize(i)];

        trace1.y[i] = (100*$scope.myVariants[i].Count)/getLargest();
        //console.log(trace1.y[i]);


      trace1.x[i]=($scope.myVariants[i].Position);
      trace1.text[i]=$scope.myVariants[i].AAMutation;



}

var data = [trace1];

var positions =[];
 for (var i =0; i < $scope.myVariants.length;i++)
  {
    positions[i] = $scope.myVariants[i].Position;

  }
//may need to use other method
  positions.sort();
//  console.log(positions[0]);

function getWidth()
{

  var changer = false;
    $(window).on('orientationchange', function(event) {
          changer = true;
          location.reload();
          return ($(window).width()+"px")


        });

}



//rare, common, very common legend
var layout = {
 width: getWidth(),
 height: getWidth()/2,
title:'Relative frequency of the '+$scope.myVariants.length+" most common variants of TP53. Patient variant is highlighted.",
//  title: "The graph below displays the patient's detected\nTP53 variant and variants near it in sequential order, based on AA position\nThe larger the bubble, the more common the variant is in the population (data from COSMIC).\nHover over each bubble to learn more information about each variant.\nThe patient's variant is highlighted in yellow.",
  font: {size: 9.5},

  plot_bgcolor: 'rgb(223, 223, 223)',
  hovermode: 'closest',
  margin: {
    l: 30,
    r: 30,
    b: 50,
    t: 50

  },
  scale:20,
  xaxis:{



    visible:true,

    //just label patient and start and finish
    showticklabels:true,
    //autotick:false,

    tickangle: 45,
    //ntick: 20,
    //dtick:10,
    ticklen: 5,
    gridwidth: 2,
    gridcolor:'#000000',


   tickvals: [],
  ticktext:[],
    title: 'Position (AA)'
  },
  yaxis:{
    showticks:true,
    showticklabels:true,
    showgrid:false,

    //showticklabels: true,
    title: 'Frequency (increasing)'

  }


};


 for (var i =0; i < $scope.myVariants.length;i++)
  {
    layout.xaxis.tickvals[i] = positions[i];
    if (i==0 || $scope.myVariants[i].CosmicID==$scope.patientVariants[0].Mutation1 || i==($scope.myVariants.length)-1)
    {
      layout.xaxis.ticktext[i] = positions[i];
    }
    else {
      layout.xaxis.ticktext[i] = "";

    }


  }





$(document).ready(function(){




Plotly.plot(document.getElementById("tester"), data, layout, {displayModeBar: false});

var myPlot = document.getElementById('tester');

var d3 = Plotly.d3;

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var hoverInfo = document.getElementById('hoverinfo');
//var hoverBubble = document.getElementById('img');
var picture;
myPlot.on('plotly_hover', function(data){

    var infotext = data.points.map(function(d){
      for (var i =0; i< $scope.myVariants.length;i++)
      {
        if(d.x.toPrecision(3)== $scope.myVariants[i].Position)
        {

          if(DetermineSize(i)==0)
          {
      //  hoverBubble.src="img/cohort1.jpg";
          }
          if(DetermineSize(i)==1)
          {
          //  hoverBubble.src="img/cohort2.png";
          }
          if(DetermineSize(i)==2)
          {
            //hoverBubble.src="img/cohort3.png";

          }
          return ('Gene: TP53'+'<br/>AA Mutation: '+$scope.myVariants[i].AAMutation+'<br/>CDS Mutation: '+$scope.myVariants[i].CMutation+'<br/>Position: '+$scope.myVariants[i].Position+'<br/>Resistance: '+$scope.myVariants[i].Resistant+'<br/>Sensitivity: '+$scope.myVariants[i].Sensitive);
        }
      }

    });

    hoverInfo.innerHTML = infotext.join('');


})
 .on('plotly_unhover', function(data){
//   hoverBubble.src="img/tp53legend.png";
  //  hoverInfo.innerHTML = 'Hover over graph for information on each variant.';
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
     var width = 600,
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
                 div.transition()
                 .duration(200)
                 .style("opacity", .9)

                 div.html(d.classifier+": "+ d.name+ "<br/>Response:"+ d.Response+"<br/>Approach: "+ d.Approach+"<br/>Evidence: "+ d.Evidence)

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
      return d.Position;
    }
    if(d.ID==12979)
    {
      return d.name;
    }

})}


             function click(d) {
             // fade out all text elements

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

      });


           var linear = d3.scale.linear()
        .domain([0,10])
        .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

      var svg = d3.select("svg");

      svg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

      var legendLinear = d3.legend.color()
        .shapeWidth(30)
        .cells(10)
        .orient('horizontal')
        .scale(linear);

      svg.select(".legendLinear")
        .call(legendLinear);

})

.controller('CDH1Ctrl', function($scope, $http) {

  $http.get("js/TP53.php").then(function (response) {
      //console.log("hello in function");
      $scope.myVariants = response.data.records;
  var data1 = {
  values: [],
  labels: [],
  type: 'pie'
};

for (var i =0; i< $scope.myVariants.length; i++)
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
})
})
