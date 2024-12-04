<script lang="ts">
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    import PlusButton from '../components/plusButton.svelte';
    export let data: MyEvent[];
    export let topic;

    const ROWS = 7;
    const COLS = 50;
    const SIZE = 20;
    const GAP = 5;
    const RADIUS = 4;
    const ELEMENT_ID = "svg";
    const CONTAINER_ID = "container";

    console.log(data)
    /**
     *
     * @param data - should be sorted in descending order (most recent date first) and partitioned by day
     */
    const padToCurrentDay = (data: MyEvent[]) => {
        const currentDay = new Date().setHours(0, 0, 0, 0); // round down current day
        const referenceDay = new Date(data[0][0]).setHours(0, 0, 0, 0); // round down first date in data

        const millisInDay = 24 * 60 * 60 * 1000;
        const gapInDays = Math.floor((currentDay - referenceDay) / millisInDay);
        const pad = new Array(gapInDays).fill(0);
        return pad.concat(data);
    }
    const init = (data: MyEvent[]) => {
        const offset = ROWS - 1 - new Date().getDay();
        const range = d3.range(ROWS * COLS - offset);
        const colIndex = (d: number) => (COLS - 1) - Math.floor((d + offset) / ROWS);
        const rowIndex = (d: number) => (ROWS - 1) - ((d + offset) % ROWS);
        const levels = (d: number) => {
            return data[d] && data[d][1] ? 1 : 0;
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
            .attr("fill", d => levels(d) ? 'mediumseagreen' : "lightslategrey")
            .style("stroke", "rgba(0,0,0,0")
            .style("rx", RADIUS)
            .attr("opacity", d => levels(d) ? 1 : 0.3)
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
            popup.style("visibility", "visible")
                .style("top", `${e.offsetY}px`)
                .style("left", `${e.offsetX}px`)
                .text(JSON.stringify(data[d]))
        })
        grid.on("mouseout", function() {
            popup.style("visibility", "hidden");
        });

        return () => {
            d3.select(`#${CONTAINER_ID}`)
                .selectAll("*")
                .remove();
        };
    }
    onMount(() => {
        init(padToCurrentDay(data))
    });

    const addEvent = async () => {
        const response = await fetch('/events', {
            method: 'POST',
            body: JSON.stringify({ topic }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
    };

</script>

<div class="chart-container">
    <div class="header">
        <h1>{topic}</h1>
        <button class="button" on:click={addEvent}>Add event <PlusButton size={20} /></button>
    </div>
    <svg id={ELEMENT_ID} width={`${(SIZE + GAP) * COLS}`} height="200" />
</div>

<style lang="scss">
    .chart-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 20px;
    }
    .header {
        width: 100%;
        display: flex;
        gap: 30px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        h1 {
            font-size: 2rem;
        }
    }
    .button {
        all: unset;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        padding: 10px;
        font-size: 1.25rem;

        cursor: pointer;
        &:hover {
            opacity: 50%;
        }
    }
</style>