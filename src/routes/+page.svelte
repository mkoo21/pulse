<script lang="ts">
    export let data;
    import SomeChart from '../components/someChart.svelte';

</script>

<SomeChart data={data.dataset} topic="fake_topic"/>