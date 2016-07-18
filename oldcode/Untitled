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
