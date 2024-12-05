<script lang="ts">
    export let data;
    import SomeChart from '../components/someChart.svelte';
</script>

{#each Object.keys(data.topics) as topic}
    <div class="chart-container">
        <SomeChart data={data.topics[topic]} topic={topic} />
    </div>
{/each}

<style>
    .chart-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }
</style>