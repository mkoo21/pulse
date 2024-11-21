const ROWS = 7;
const COLS = 50;
const SIZE = 10;
const GAP = 3;
const RX = 5;

const data = d3.range(ROWS * COLS);
const svg = d3.select("svg#d3");
const grid = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => (d % COLS) * (SIZE + GAP))
    .attr("y", d => Math.floor(d / COLS) * (SIZE + GAP))
    .attr("width", SIZE)
    .attr("height", SIZE)
    .attr("fill", "mediumseagreen")
    .attr("stroke", "white")
    .attr("stroke-width", 1);



// ensuring script is properly embedded
const testElement = document.createElement('p');
testElement.textContent = 'script works';
const targetElement = document.querySelector('#foo');
targetElement.appendChild(testElement);
