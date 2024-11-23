<script lang="ts">
    export let data;
    import SomeChart from '../components/someChart.svelte'
    console.log(data);
</script>

<SomeChart data={data.dataset}/>