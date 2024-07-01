<!-- signin/+page.svelte -->

<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    export let data;

    onMount(() => {
      if (data.info.sessionToken) {
        goto('/');
      }
    });

    

</script>
<h1>This is the signin page</h1>
<form action="/signin" method="POST">
  <input type="text" name="email" placeholder="email" />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit">Sign in</button>
</form>