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

      }

      else {
      //  trace1.marker.color[count]='rgb(144,195,212)';


        var xvalues =0;

        trace1.r[count]= Math.random() * (max - min) + min;



      //  console.log(trace1.x[count]);
        trace1.t[count]=  Math.random() * (max2 - min2) + min2;}

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
