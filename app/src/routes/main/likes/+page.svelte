<script>
    import posts from '$lib/stores/data.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getContext } from 'svelte';

    let formError = 0;
    let ideas = [];
    
    const currentUser = getContext('user').user;

    onMount(() => {

        const unsubscribe = posts.subscribe(value => {
            if (value.data){
                ideas = Object.values(value.data).filter(idea => idea.isLiked == 1 && idea.date === null);
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

<div class="title" style="margin-bottom:2vh;" >Liked Ideas</div>



<div class="posts">
    {#each ideas as idea}
        <div class="post">
            <div class="post-title">{idea.title}</div>
            <div class="post-author"><span>By : </span>{idea.author.name}</div>
            <div class="post-location"><span>Where : </span>{idea.location}</div>
            <div class="post-content"><span>What : </span>{idea.content}</div>
            <div class="post-form">
                <form action="?/addDate" method="POST">
                    <input type="text" name="id" value={idea.id} hidden>
                    <input type="date" name="date" required>
                    <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg></button>
                </form>
            </div>
        </div>
    {/each}
</div>
