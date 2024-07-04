<script>
    import '$lib/assets/main.css';
    import { updateFetchPosts } from '$lib/stores/data.js'
    import { onDestroy, onMount } from 'svelte';
    import { setContext } from 'svelte';

    export let data;
    let intervalId;

    onMount(() => {
        intervalId = updateFetchPosts();
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });

    setContext('user', data); 

</script>
<slot />