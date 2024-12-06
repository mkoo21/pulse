<script lang="ts">
	import '../app.css';

    const THEMES = ['dark', 'light'];
    let theme = $state(THEMES[0]);
	let { children } = $props();

    const changeTheme = () => {
        theme = THEMES[( THEMES.indexOf(theme) + 1 ) % THEMES.length]
    }
</script>

<div id="background" class={`${theme}`}>
	{@render children()}
</div>

<div class="themebutton" on:click={changeTheme}>
	change theme
</div>

<style>
	#background {
		background: radial-gradient(var(--close-extreme-color), var(--bg-color));
		color: var(--text-color);
		height: 100dvh;
		width: 100dvw;
	}

	.themebutton {
		position: absolute;
		top: 90%;
		left: 90%;
		width: 100px;
		height: 50px;
		background: white;
		border-radius: 10px;
	}

</style>