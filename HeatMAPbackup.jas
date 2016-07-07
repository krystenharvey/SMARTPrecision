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


  var trace1 = {
      type: 'scatter',
      line:false,
       x: [],
       y: [],
       text: [],
       // initial text -->text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
       mode: 'markers',
       marker:{
         sizemode: "area",
         sizeref: 0.0006,
         color:[],
         size: []
       }
     };
       $http.get("js/janedoe.php").then(function (response) {
         $scope.patientVariants = response.data.JaneDoe;
         console.log($scope.patientVariants[0].Mutation1);
       });


  $http.get("js/TP53.php").then(function (response) {
      console.log("hello in function");
      $scope.myVariants = response.data.records;
      console.log("hello in function");
    //  console.log($scope.myVariants[0].ID);
    //  console.log($scope.myVariants.length);

      var array = [];
      for (var i =0; i<$scope.myVariants.length;i++)
      {
        array[i] = $scope.myVariants[i].Count;
      }

      var largest =1;

      for (i=0; i<$scope.myVariants.length;i++){
        if (array[i]>largest) {
        largest=array[i];
    }
}
//  console.log(largest);

var count = 0;
var counter =0;
for (i =0; i<$scope.myVariants.length;i++)
{
        if ($scope.patientVariants[0].Mutation1==$scope.myVariants[i].Mutation)
        {
          trace1.x[count]=100;
          trace1.y[count]=900;
          trace1.text[count]="Mutation: "+ $scope.myVariants[i].Mutation+"\n"+
          "ID: "+$scope.myVariants[i].ID;

          trace1.marker.color[count]='rgb(255, 255, 0)';
          trace1.marker.size[count]=(($scope.myVariants[i].Count)*10)/$scope.myVariants[0].Count;
        }

        else {

          var xvalues =0;


          trace1.x[count]= (counter);
        //  console.log(trace1.x[count]);
          trace1.y[count]= $scope.myVariants[i].Count
        //console.log(trace1.y[count]);
        trace1.text[count]="Mutation: "+ $scope.myVariants[i].Mutation+"\n"+
        "ID: "+$scope.myVariants[i].ID;
        //console.log(trace1.text[count]);

        //trace1.mode[count]= 'markers';
        //console.log(trace1.mode[i]);
        if (count%2 ==0)
        trace1.marker.color[count]='rgb(93, 184, 214)';
        if (count%2 !=0)
        trace1.marker.color[count]='rgb(255, 144, 14)';

        if (count!=0)
        trace1.marker.size[count]=(($scope.myVariants[i].Count)*10)/$scope.myVariants[0].Count;
        else {
          trace1.marker.size[count]=5;
        }

      }
       //console.log(trace1.marker.color[count]);
      //console.log(trace1.marker.size[count]);
      count++;
      counter +=15;

}

//console.log(trace1.y.length);
//$scope.iframeHeight = $(document).height();

var data = [trace1];

var layout = {
  title: 'TP53 Variants'+'\n\n'+'Jane Doe Mutation: '+$scope.patientVariants[0].Mutation1,
 autosize: true,
 width: 1050,
 height:800,
  showlegend: false,
  showticks:false,
  xaxis: {
    type: 'log'
  },
  yaxis: {
    type: 'log'
  }
};

var data2 = [{
  x: [1,2,3,4,5,6,7,8,9,10],
  y: [1,2,3,4,5],
  z:[
    [],
    [],
    [],
    [],[]
  ],
  type: 'heatmap',
  colorscale: colorscaleValue,
  showscale: false
}];

//console.log(data[0].x[0]);

var colorscaleValue = [
  [0, '#3D9970'],
  [1, '#001f3f']
];
$http.get("js/TP53.php").then(function (response) {
    console.log("hello in function");
    $scope.myVariants = response.data.records;
    console.log("hello in function");
  //  console.log($scope.myVariants[0].ID);
  //console.log($scope.myVariants.length);

var x =0;
var count =0;
while (x < 5)
{
for (var j =0; j<10;j++)
{

      data2[0].z[x][j]= $scope.myVariants[count].Count;
      console.log(data2[0].z[x][j]);
      count ++;

}
//console.log(data[0].z[x]);
x++;
}

var layout2 = {
title: 'TP53 Variants\nJane Doe Mutation: '+$scope.patientVariants[0].Mutation1,
annotations: [],
xaxis: {
  ticks: '',
  side: 'top'
},
yaxis: {
  ticks: '',
  ticksuffix: ' ',
  width: 700,
  height: 700,
  autosize: false
}
};

for ( var i = 0; i < data2[0].y.length; i++ ) {
for ( var j = 0; j < data2[0].x.length; j++ ) {
  var currentValue = data2[0].z[i][j];
  if (currentValue != 0.0) {
    var textColor = 'white';
  }else{
    var textColor = 'black';
  }
  var result = {
    xref: 'x1',
    yref: 'y1',
    x: data2[0].x[j],
    y: data2[0].y[i],
    text: /*//data2[0].z[i][j],*/$scope.myVariants[i].Mutation,
    font: {
      family: 'Arial',
      size: 12,
      color: 'rgb(50, 171, 96)'
    },
    showarrow: false,
    font: {
      color: textColor
    }
  };
  layout2.annotations.push(result);
}
}


$(document).ready(function(){

Plotly.plot(document.getElementById("tester"), data, layout);
Plotly.plot(document.getElementById("tester2"), data2, layout2);

var myPlot = document.getElementById('tester');
myPlot.on('plotly_click', function(data){
    var pts = '';
    for(var i=0; i < data.points.length; i++){
        pts = 'x = '+data.points[i].x +'\ny = '+
            data.points[i].y.toPrecision(4) + '\n\n';
    }
    //alert('Mutation':\n\n'+pts);
});
 })
});


})
})

.controller('pIK3CAGeneVariantsCtrl', function($scope) {

})

.controller('bRAFGeneVariantsCtrl', function($scope) {

})

.controller('eGFRGeneVariantsCtrl', function($scope) {

})

.controller('bRAC1Ctrl', function($scope) {

})
