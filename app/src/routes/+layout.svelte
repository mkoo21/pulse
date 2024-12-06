<script lang="ts">
	import '../app.css';
	import Theme from '../components/theme.svelte';
	let { children } = $props();
</script>

<Theme>
	{@render children()}
</Theme>
