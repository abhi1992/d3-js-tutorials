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
  var fixedLengthMark = 100;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < width; i+=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    line(svg, mark);
    // svg.append("line")
    //   .attr("x1", mark.x1)
    //   .attr("y1", mark.y1)
    //   .attr("x2", mark.x2) 
    //   .attr("y2", mark.y2)
    //   .style("stroke", "rgb(0,0,0)")
    //   .style("stroke-width", 2);
    var coord = {
      x1: mark.x1-padding*.5,
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; })
    // svg.append("text")
    //   .attr("x", mark.x1-padding*.5)
    //   .attr("y", mark.y2+padding)
    //   .attr("dy", ".35em")
    //   .text(function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    line(svg, mark);
    // svg.append("line")
    //   .attr("x1", mark.x1)
    //   .attr("y1", mark.y1)
    //   .attr("x2", mark.x2) 
    //   .attr("y2", mark.y2)
    //   .style("stroke", "rgb(0,0,0)")
    //   .style("stroke-width", 2);
    var coord = {
      x1: mark.x1-padding*.5,
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
    // svg.append("text")
    //   .attr("x", mark.x1-padding*.5)
    //   .attr("y", mark.y2+padding)
    //   .attr("dy", ".35em")
    //   .text(function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }
  
}

function drawYAxisNumbers(svg, width, height, padding) {
  var center = height / 2;
  var fixedLengthMark = 100;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < height; i+=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    line(svg, mark);
    // svg.append("line")
    //   .attr("x1", mark.x1)
    //   .attr("y1", mark.y1)
    //   .attr("x2", mark.x2) 
    //   .attr("y2", mark.y2)
    //   .style("stroke", "rgb(0,0,0)")
    //   .style("stroke-width", 2);
    const coord = {
      x1: mark.x1-padding*1.5,
      y1: mark.y2
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
    // svg.append("text")
    //   .attr("x", mark.x1-padding*1.5)
    //   .attr("y", mark.y2)
    //   .attr("dy", ".35em")
    //   .text(function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    line(svg, mark);
    // svg.append("line")
    //   .attr("x1", mark.x1)
    //   .attr("y1", mark.y1)
    //   .attr("x2", mark.x2) 
    //   .attr("y2", mark.y2)
    //   .style("stroke", "rgb(0,0,0)")
    //   .style("stroke-width", 2);
    const coord = {
      x1: mark.x1-padding*1.5,
      y1: mark.y2
    };
    text(svg, coord, function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
    // svg.append("text")
    //   .attr("x", mark.x1-padding*1.5)
    //   .attr("y", mark.y2)
    //   .attr("dy", ".35em")
    //   .text(function(d) { return i/fixedLengthMark-center/fixedLengthMark; });
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
  // svg.append("line")
  //   .attr("x1", 0+padding)
  //   .attr("y1", center)
  //   .attr("x2", 2*padding) 
  //   .attr("y2", center+padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  coord = {
    x1: 2*padding,
    y1: center-padding,
    x2: padding,
    y2: center
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", 2*padding)
  //   .attr("y1", center-padding)
  //   .attr("x2", padding) 
  //   .attr("y2", center)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  coord = {
    x1: width-padding,
    y1: center,
    x2: width-2*padding,
    y2: center+padding
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", width-padding)
  //   .attr("y1", center)
  //   .attr("x2", width-2*padding) 
  //   .attr("y2", center+padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  coord = {
    x1: width-2*padding,
    y1: center-padding,
    x2: width-padding,
    y2: center
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", width-2*padding)
  //   .attr("y1", center-padding)
  //   .attr("x2", width-padding) 
  //   .attr("y2", center)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
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
  // svg.append("line")
  //   .attr("x1", center)
  //   .attr("y1", 0+padding)
  //   .attr("x2", center+padding)
  //   .attr("y2", 2*padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  coord = {
    x1: center-padding,
    y1: 2*padding,
    x2: center,
    y2: padding
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", center-padding)
  //   .attr("y1", 2*padding)
  //   .attr("x2", center)
  //   .attr("y2", padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  // center = width/2;
  coord = {
    x1: center,
    y1: width-padding,
    x2: center+padding,
    y2: width-2*padding
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", center)
  //   .attr("y1", width-padding)
  //   .attr("x2", center+padding)
  //   .attr("y2", width-2*padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  coord = {
    x1: center-padding,
    y1: width-2*padding,
    x2: center,
    y2: width-padding
  };
  line(svg, coord);
  // svg.append("line")
  //   .attr("x1", center-padding)
  //   .attr("y1", width-2*padding)
  //   .attr("x2", center)
  //   .attr("y2", width-padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
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
  // svg.append("line")
  //   .attr("x1", 0+padding)
  //   .attr("y1", center.y)
  //   .attr("x2", height - padding) 
  //   .attr("y2", center.y)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  drawXAxisNumbers(svg,width,height,padding);
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
  // svg.append("line")
  //   .attr("x1", center.x)
  //   .attr("y1", padding)
  //   .attr("x2", center.x) 
  //   .attr("y2", height-padding)
  //   .style("stroke", "rgb(0,0,0)")
  //   .style("stroke-width", 2);
  drawYAxisNumbers(svg,width,height,padding);
  drawYArrows(svg, width, height, padding);
}