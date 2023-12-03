/*
   Filename: AdvancedDataVisualization.js

   Description: This code demonstrates an advanced data visualization technique using JavaScript. It generates a complex and interactive scatter plot with multiple datasets, tooltips, zoom, and filter functionality.

   Author: John Doe
   Date: February 20, 2022
*/

// Define data arrays
const dataset1 = [
   { x: 10, y: 20, category: 'A' },
   { x: 15, y: 5, category: 'B' },
   { x: 25, y: 10, category: 'C' },
   // ...more data points
];

const dataset2 = [
   { x: 5, y: 15, category: 'A' },
   { x: 20, y: 10, category: 'B' },
   { x: 12, y: 22, category: 'C' },
   // ...more data points
];

// Create SVG container
const width = 800;
const height = 600;
const svg = d3.select("body")
   .append("svg")
   .attr("width", width)
   .attr("height", height);

// Define scales and axes
const xScale = d3.scaleLinear()
   .domain([0, d3.max([...dataset1, ...dataset2], d => d.x)])
   .range([50, width - 50]);

const yScale = d3.scaleLinear()
   .domain([0, d3.max([...dataset1, ...dataset2], d => d.y)])
   .range([height - 50, 50]);

const colorScale = d3.scaleOrdinal()
   .domain(['A', 'B', 'C'])
   .range(['#FF0000', '#00FF00', '#0000FF']);

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Add axes to the SVG
svg.append("g")
   .attr("transform", `translate(0, ${height - 50})`)
   .call(xAxis);

svg.append("g")
   .attr("transform", "translate(50, 0)")
   .call(yAxis);

// Add scatter plot dots
svg.selectAll("circle")
   .data([...dataset1, ...dataset2])
   .enter()
   .append("circle")
   .attr("cx", d => xScale(d.x))
   .attr("cy", d => yScale(d.y))
   .attr("r", 5)
   .attr("fill", d => colorScale(d.category))
   .on("mouseover", handleMouseOver)
   .on("mouseout", handleMouseOut);

// Define tooltip
const tooltip = d3.select("body")
   .append("div")
   .attr("class", "tooltip")
   .style("opacity", 0);

// Handle mouseover event
function handleMouseOver(d) {
   tooltip.transition()
      .duration(200)
      .style("opacity", .9);
   
   tooltip.html(`X: ${d.x}<br>Y: ${d.y}<br>Category: ${d.category}`)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 10) + "px");
}

// Handle mouseout event
function handleMouseOut(d) {
   tooltip.transition()
      .duration(500)
      .style("opacity", 0);
}

// Add zoom functionality
const zoom = d3.zoom()
   .scaleExtent([1, 10])
   .on("zoom", handleZoom);

svg.call(zoom);

// Handle zoom event
function handleZoom() {
   svg.attr("transform", d3.event.transform);
}

// Add filter functionality
const filterInput = d3.select("body")
   .append("input")
   .attr("type", "text")
   .on("input", handleFilter);

// Handle filter input event
function handleFilter() {
   const filterValue = filterInput.node().value.toUpperCase();

   svg.selectAll("circle")
      .style("visibility", d => d.category.toUpperCase().includes(filterValue) ? "visible" : "hidden");
}

// Additional code for handling more advanced scenarios...
// ...e.g., brushing, animations, interactivity, etc.

// ...200+ more lines of code


// Execute the code