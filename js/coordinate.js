$(document).ready(function() {
  var width = 800;
  var height = 800;
  var svg = d3.select("#svgcontainer")
    .append("svg").attr("width", width).attr("height", height);
  drawAxes(svg, width, height);
  });

function line(svg, coordinates, color="rgb(0,0,0)", strokeWidth=2) {
  svg.append("line")
  .attr("x1", coordinates.x1)
  .attr("y1", coordinates.y1)
  .attr("x2", coordinates.x2) 
  .attr("y2", coordinates.y2)
  .style("stroke", color)
  .style("stroke-width", strokeWidth);
}

function text(svg, coordinates, text, size="0.35em") {
  svg.append("text")
    .attr("x", coordinates.x1)
    .attr("y", coordinates.y1)
    .attr("dy", size)
    .text(text);
}

function drawAxes(svg, width, height) {
  var padding = 10;
  drawXAxis(svg, width, height, padding);
  drawYAxis(svg, width, height, padding);
  drawZero(svg, width, height, padding);
}

function drawZero(svg, width, height, padding) {
  svg.append("text")
      .attr("x", width/2+padding*.5)
      .attr("y", height/2+padding)
      .attr("dy", ".35em")
      .text(0);
}

function drawXAxisNumbers(svg, width, height, padding) {
  var center = width / 2;
  var fixedLengthMark = 40;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < width; i+=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    line(svg, mark);
    var coord = {
      x1: mark.x1-padding*.5,
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });  
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    line(svg, mark);
    var coord = {
      x1: mark.x1-padding*.5,
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }
}

function drawYAxisNumbers(svg, width, height, padding) {
  var center = height / 2;
  var fixedLengthMark = 40;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < height; i+=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    line(svg, mark);
    const coord = {
      x1: mark.x1-padding*1.5,
      y1: mark.y2
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    line(svg, mark);
    const coord = {
      x1: mark.x1-padding*1.5,
      y1: mark.y2
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }
}

function drawXArrows(svg, width, height, padding) {
  var center = height / 2;
  var coord = {
    x1: padding,
    y1: center,
    x2: 2*padding,
    y2: center+padding
  };
  line(svg, coord);
  coord = {
    x1: 2*padding,
    y1: center-padding,
    x2: padding,
    y2: center
  };
  line(svg, coord);
  coord = {
    x1: width-padding,
    y1: center,
    x2: width-2*padding,
    y2: center+padding
  };
  line(svg, coord);
  coord = {
    x1: width-2*padding,
    y1: center-padding,
    x2: width-padding,
    y2: center
  };
  line(svg, coord);
}

function drawYArrows(svg, width, height, padding) {
  var center = width / 2;
  var coord = {
    x1: center,
    y1: padding,
    x2: center+padding,
    y2: 2*padding
  };
  line(svg, coord);
  coord = {
    x1: center-padding,
    y1: 2*padding,
    x2: center,
    y2: padding
  };
  line(svg, coord);
  coord = {
    x1: center,
    y1: width-padding,
    x2: center+padding,
    y2: width-2*padding
  };
  line(svg, coord);
  coord = {
    x1: center-padding,
    y1: width-2*padding,
    x2: center,
    y2: width-padding
  };
  line(svg, coord);
}

function drawXAxis(svg, width, height, padding) {
  var center = {
    x: width/2,
    y: height/2,
  };
  var coord = {
    x1: padding,
    y1: center.y,
    x2: height - padding,
    y2: center.y
  };
  line(svg, coord);
  drawXAxisNumbers(svg, width, height, padding);
  drawXArrows(svg, width, height, padding);
}


function drawYAxis(svg, width, height, padding) {
  var center = {
    x: width/2,
    y: height/2,
  };
  var coord = {
    x1: center.x,
    y1: padding,
    x2: center.x,
    y2: height - padding
  };
  line(svg, coord);
  drawYAxisNumbers(svg, width, height, padding);
  drawYArrows(svg, width, height, padding);
}