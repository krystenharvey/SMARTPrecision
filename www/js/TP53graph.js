var app = angular.module('myApp', []);
app.controller('MyCtrl', function($scope, $http) {
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



$(document).ready(function(){

Plotly.plot(document.getElementById("tester"), data, layout);
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
   });
