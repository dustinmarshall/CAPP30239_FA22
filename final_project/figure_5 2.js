(function figure_3() {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#figure_3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data and compute summary statistics for each specie
d3.csv("mean_response_kenya.csv", function(data) {

  // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.concern_id;})
    .rollup(function(d) {
      mean = d.response_mean
      se = d.response_se
      min = mean - 1.96 * d.response_se
      max = mean + 1.96 * d.response_se
      return({mean: mean, se: se, min: min, max: max})
    })
    .entries(data)

  // Show the X scale
  var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(["(Lack of) trust in government", "(Lack of) trust in healthcare workers", "COVID-19 is not real", "God's protection", "Rumors", "Side effects", "Vaccine effectiveness"])
    .paddingInner(1)
    .paddingOuter(.5)
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Show the Y scale
  var y = d3.scaleLinear()
    .domain([-1,1])
    .range([height, 0])
  svg.append("g").call(d3.axisLeft(y))

  // Show the main vertical line
  svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key))})
      .attr("x2", function(d){return(x(d.key))})
      .attr("y1", function(d){return(y(d.value.min))})
      .attr("y2", function(d){return(y(d.value.max))})
      .attr("stroke", "black")
      .style("width", 40)

  // rectangle for the main box
  var boxWidth = 100
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(x(d.key)-boxWidth/2)})
        .attr("y", function(d){return(y(d.value.max))})
        .attr("height", function(d){return(y(d.value.min)-y(d.value.max))})
        .attr("width", boxWidth )
        .attr("stroke", "black")
        .style("fill", "#2270b5")

  // Show the median
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
      .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
      .attr("y1", function(d){return(y(d.value.mean))})
      .attr("y2", function(d){return(y(d.value.mean))})
      .attr("stroke", "black")
      .style("width", 80)
})
})();