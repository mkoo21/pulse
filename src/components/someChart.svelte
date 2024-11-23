<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    export let data: MyEvent[];

    const ROWS = 7;
    const COLS = 50;
    const SIZE = 20;
    const GAP = 5;
    const RADIUS = 4;
    const ELEMENT_ID = "some-chart";
    const CONTAINER_ID = "container";

    const init = () => {
        const offset = ROWS - 1 - new Date().getDay();
        const range = d3.range(ROWS * COLS - offset);
        const colIndex = (d: number) => (COLS - 1) - Math.floor((d + offset) / ROWS);
        const rowIndex = (d: number) => (ROWS - 1) - ((d + offset) % ROWS);
        const levels = (d: number) => {
            return data[d] && data[d][2] ? 1 : 0;
        }

        const svg = d3.select(`svg#${ELEMENT_ID}`);
        const grid = svg.selectAll("rect")
            .data(range)
            .enter()
            .append("rect")
            .attr("x", d => colIndex(d) * (SIZE + GAP) )
            .attr("y", d => rowIndex(d) * (SIZE + GAP) )
            .attr("width", SIZE)
            .attr("height", SIZE)
            .attr("fill", d => levels(d) ? 'mediumseagreen' : "aliceblue")
            .style("stroke", "rgba(0,0,0,0")
            .style("rx", RADIUS)
            .attr("opacity", d => levels(d) ? 1 : 0.1)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        const popup = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("padding", "5px")
        .style("border-radius", "5px");

        grid.on('mouseover', (e, d) => {
            console.log(e)
            popup.style("visibility", "visible")
                .style("top", `${e.offsetY}px`)
                .style("left", `${e.offsetX}px`)
                .text(JSON.stringify(data[d]))
        })

        return () => {
            d3.select(`#${CONTAINER_ID}`)
                .selectAll("*")
                .remove();
        };
    }
    onMount(init);

</script>

<div id={CONTAINER_ID}>
    <svg id={ELEMENT_ID} width="100%" height="200" />
</div>
