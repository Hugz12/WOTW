<script>
    import '$lib/assets/main.css';
    import { updateFetchPosts, posts } from '$lib/stores/data.js'
    import { onMount } from 'svelte';
    import { setContext } from 'svelte';

    export let data;

    onMount(() => {
        const intervalId = updateFetchPosts();
        return () => clearInterval(intervalId);
    });

    setContext('user', data); 

</script>
<slot />