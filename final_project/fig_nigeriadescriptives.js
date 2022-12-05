(function fig_nigeriadescriptives() {
const margin = { top: 20, right: 20, bottom: 20, left: 250 },
  width = 700 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#fig_nigeriadescriptives")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv(
  "afro-study-nigeria.csv"
).then(function (data) {
  // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
  const myGroups = Array.from(new Set(data.map((d) => d.group)));
  const myVars = Array.from(new Set(data.map((d) => d.variable)));

  // Build X scales and axis:
  const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.05);
  svg
    .append("g")
    .style("font-size", 15)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain")
    .remove();

  // Build Y scales and axis:
  const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.05);
  svg
    .append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain")
    .remove();

  // Build color scale
  const myColor = d3
    .scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([1, 100]);

  // add the squares
  svg
    .selectAll()
    .data(data, function (d) {
      return d.group + ":" + d.variable;
    })
    .join("rect")
    .attr("x", function (d) {
      return x(d.group);
    })
    .attr("y", function (d) {
      return y(d.variable);
    })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", function (d) {
      return myColor(d.value);
    })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)

  var bar = svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "label")
    .attr("transform", "translate(10,15)");
  bar
    .append("text")
    .style("fill", "white")
    .attr("x", (d) => x(d.group))
    .attr("y", (d) => y(d.variable))
    .attr("dy", ".35em")
    .text((d) => d.value);
});
})();