(function fig_willkenya() {
  var svg = d3.select("#fig_willkenya"),
      margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      svg.append("circle").attr("cx",1350).attr("cy",130).attr("r", 6).style("fill", "#c6daef")
      svg.append("circle").attr("cx",1350).attr("cy",160).attr("r", 6).style("fill", "#0a306b")
      svg.append("text").attr("x", 1360).attr("y", 130).text("Pre").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white")
      svg.append("text").attr("x", 1360).attr("y", 160).text("Post").style("font-size", "15px").attr("alignment-baseline","middle").style("fill", "white");
  
  var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);
  
  var x1 = d3.scaleBand()
      .padding(0.05);
  
  var y = d3.scaleLinear()
      .rangeRound([height, 0]);
  
  var z = d3.scaleOrdinal()
      .range(['#c6daef', '#0a306b']);
  
  d3.csv("response_kenya.csv", function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, function(error, data) {
    if (error) throw error;
  
    var keys = data.columns.slice(1);
  
    x0.domain(data.map(function(d) { return d.group; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  
    g.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.group) + ",0)"; })
      .selectAll("rect")
      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
      .enter().append("rect")
        .attr("x", function(d) { return x1(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return z(d.key); });
  
    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));
  
    g.append("g")
      .append("text")
        .attr("x", 1.5)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");
  });
  })();