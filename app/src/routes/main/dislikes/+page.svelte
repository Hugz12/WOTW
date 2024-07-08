<script>
    import posts from '$lib/stores/data.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getContext } from 'svelte';

    let ideas = [];
    
    const currentUser = getContext('user').user;

    onMount(() => {

        const unsubscribe = posts.subscribe(value => {
            if (value.data){
                ideas = Object.values(value.data).filter(idea => idea.isLiked == 2);
            }
            if (value.error){
                goto('/signin');
            }
        });
        
        return () => {
            unsubscribe();
            console.log("Component destroyed, unsubscribed from store.");
        };
    });
</script>

<div class="title" style="margin-bottom:2vh;">Disliked Ideas</div>




<div class="posts">
    {#each ideas as idea}
        <div class="post">
            <div class="post-title">{idea.title}</div>
            <div class="post-author"><span>By : </span>{idea.author.name}</div>
            <div class="post-location"><span>Where : </span>{idea.location}</div>
            <div class="post-content"><span>What : </span>{idea.content}</div>
            <div class="post-buttons">
                {#if currentUser.id === idea.authorId}
                    <form action="?/delete" method="POST">
                        <input type="text" name="id" value={idea.id} hidden>
                        <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#698474"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                    </form>
                {/if}
            </div>
        </div>
    {/each}
</div>
