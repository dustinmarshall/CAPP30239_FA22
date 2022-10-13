/* Bar chart of COVID cases */

d3.csv("covid.csv").then(data => {
    
    for (let d of data) {
        d.cases = +d.cases;
    }

    const height = 400,
          width = 600,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 });

    let svg = d3.select("#chart")
                .append("svg")
                .attr("viewbox", [0, 0, width, height]);
    
    const x = d3.scaleBand()
                .domain(data.map(d => d.country))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.cases)]).nice()
                .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(0,${margin.left - 5,0})`)
        .call(d3.axisLeft(y))

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

});

