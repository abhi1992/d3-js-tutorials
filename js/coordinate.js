$(document).ready(function() {
  $( "#minbeds" ).on( "change", function() {
    slider.slider( "value", this.selectedIndex + 1 );
  });

  var width = 800;
  var height = 800;
  var svg = d3.select("#svgContainer")
    .append("svg").attr("id", "svg").attr("width", width).attr("height", height);
  refresh(svg, width, height, 1, 1);

  var select = $( "#minbeds" );

  var multiplier = parseFloat($("#multiplierSelect").val());

  $('#multiplierSelect').on('change', function() {
    var multiplier = parseFloat(this.value);
    refresh(svg, width, height, $("#minbeds").val(), multiplier);
  });

  var slider = $( "<div id='slider' class=\"grid-slider\"></div>" )
    .insertAfter( $("#minbeds") )
    .slider({
      min: 1,
      max: 5,
      range: "min",
      value: select[ 0 ].selectedIndex + 1,
      slide: function( event, ui ) {
        multiplier = parseFloat($("#multiplierSelect").val());
        select[ 0 ].selectedIndex = ui.value - 1;
        refresh(svg, width, height, ui.value, multiplier);
      }
  });

  function refresh(svg, width, height, scaleValue, multiplier) {
    svg.selectAll("*").remove();
    var scale = mapScaleToSelect(scaleValue);
    drawAxes(svg, width, height, scale, multiplier);
  }
  });

function mapScaleToSelect(selectValue) {
  var map = {
    '1': 40,
    '2': 50,
    '3': 72,
    '4': 80,
    '5': 100
  };
  return map[selectValue] ? map[selectValue] : 100;
}

function getPadding(padding, axisType, coordinateNum) {
  if(coordinateNum > 99) {
    if (axisType === 'y') {
      return padding * 4.5;
    } else {
      return padding * 1.2;
    }
  } else if(coordinateNum > 9) {
    if (axisType === 'y') {
      return padding * 1.5;
    } else {
      return padding * 1;
    }
  } else if(coordinateNum < -99) {
    if (axisType === 'y') {
      return padding * 3.2;
    } else if (axisType === '-y') {
      return padding * 3.9;
    } else if (axisType === '-x') {
      return padding * 1.7;
    } else {
      return padding * 1;
    }
  } else if(coordinateNum < -9) {
    if (axisType === 'y') {
      return padding * 2;
    } else if (axisType === '-y') {
      return padding * 2.8;
    } else if (axisType === '-x') {
      return padding * 1;
    } else {
      return padding * 0.8;
    }
  }  else if(coordinateNum < 0) {
    if (axisType === 'y') {
      return padding * 1.3;
    } else if (axisType === '-y') {
      return padding * 1.8;
    } else if (axisType === '-x') {
      return padding * .7;
    } else {
      return padding * 0.5;
    }
  }
}

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

function drawAxes(svg, width, height, scale, multiplier) {
  var padding = 10;
  drawXAxis(svg, width, height, padding, scale, multiplier);
  drawYAxis(svg, width, height, padding, scale, multiplier);
  drawZero(svg, width, height, padding);
}

function drawZero(svg, width, height, padding) {
  svg.append("text")
      .attr("x", width/2+padding*.5)
      .attr("y", height/2+padding)
      .attr("dy", ".35em")
      .text(0);
}

function getCoordinateNumber(current, fixedLengthMark, center, multiplier) {
  return multiplier * (current/fixedLengthMark-center/fixedLengthMark);
}

function drawXAxisNumbers(svg, width, height, padding, scale, multiplier) {
  var center = width / 2;
  var fixedLengthMark = scale;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < width; i+=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    var coordinateNum = getCoordinateNumber(i, fixedLengthMark, center, multiplier);
    line(svg, mark);
    var coord = {
      x1: mark.x1-getPadding(padding, 'x', -coordinateNum),
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return coordinateNum; });  
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: i,
      y1: center-markSize,
      x2: i,
      y2: center+markSize
    };
    var coordinateNum = getCoordinateNumber(i, fixedLengthMark, center, multiplier);
    line(svg, mark);
    var coord = {
      x1: mark.x1-getPadding(padding, '-x', coordinateNum),
      y1: mark.y2+padding
    };
    text(svg, coord, function(d) { return coordinateNum; });
  }
}

function drawYAxisNumbers(svg, width, height, padding, scale, multiplier) {
  var center = height / 2;
  var fixedLengthMark = scale;
  var markSize = 10;
  for (var i = center+fixedLengthMark; i < height; i+=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    var coordinateNum = -1 * getCoordinateNumber(i, fixedLengthMark, center, multiplier);
    line(svg, mark);
    const coord = {
      x1: mark.x1-getPadding(padding, '-y', coordinateNum),
      y1: mark.y2
    };
    text(svg, coord, function(d) { return coordinateNum; });
  }

  for (var i = center-fixedLengthMark; i > padding; i-=fixedLengthMark) {
    var mark = {
      x1: center-markSize,
      y1: i,
      x2: center+markSize,
      y2: i
    };
    var coordinateNum = -1 * getCoordinateNumber(i, fixedLengthMark, center, multiplier);
    line(svg, mark);
    const coord = {
      x1: mark.x1-getPadding(padding, 'y', -coordinateNum),
      y1: mark.y2
    };
    text(svg, coord, function(d) { return coordinateNum; });
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

function drawXAxis(svg, width, height, padding, scale, multiplier) {
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
  drawXAxisNumbers(svg, width, height, padding, scale, multiplier);
  drawXArrows(svg, width, height, padding);
}


function drawYAxis(svg, width, height, padding, scale, multiplier) {
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
  drawYAxisNumbers(svg, width, height, padding, scale, multiplier);
  drawYArrows(svg, width, height, padding);
}