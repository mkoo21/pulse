<script lang="ts">
    export let data;
    import SomeChart from '../components/someChart.svelte';

</script>

<div class="chart-container">
    <SomeChart data={data.dataset} topic="fake_event"/>
</div>

<style>
    .chart-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
    }
</style>