<script>
    import Burger from '$lib/components/Burger.svelte';
    import '$lib/assets/global.css';
    export let data;
</script>

<Burger connected={data.connected}/>

<slot />