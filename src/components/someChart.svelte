<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    export let data: MyEvent[];

    const ROWS = 7;
    const COLS = 50;
    const SIZE = 10;
    const GAP = 3;
    const RADIUS = 5;
    const ELEMENT_ID = "some-chart";

    const init = () => {
        const offset = ROWS - 1 - new Date().getDay();
        const range = d3.range(ROWS * COLS - offset);
        const colIndex = (d: number) => (COLS - 1) - Math.floor((d + offset) / ROWS);
        const rowIndex = (d: number) => (ROWS - 1) - ((d + offset) % ROWS);

        const svg = d3.select(`svg#${ELEMENT_ID}`);
        const grid = svg.selectAll("rect")
            .data(range)
            .enter()
            .append("rect")
            .attr("x", d => colIndex(d) * (SIZE + GAP) )
            .attr("y", d => rowIndex(d) * (SIZE + GAP) )
            .attr("width", SIZE)
            .attr("height", SIZE)
            .attr("fill", d => data[d] && data[d][2] ? 'mediumseagreen' : "aliceblue")
            .attr("stroke", "white")
            .attr("stroke-width", 1);
    }
    onMount(init);

</script>

<svg id={ELEMENT_ID} width="100%" height="200" />
