<script>
    import posts from '$lib/stores/data.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { getContext } from 'svelte';

    let fetchError = false;
    let formError = 0;
    let ideas = [];
    
    const currentUser = getContext('user').user;


    // Form variables
    let title = '';
    let content = '';
    let location = '';

 

    onMount(() => {

        const unsubscribe = posts.subscribe(value => {
            if (value.data)
                ideas = Object.values(value.data);
            if (value.error)
                fetchError = value.error;
                if (fetchError) goto('/signin');
        });
        
        return () => {
            unsubscribe();
            console.log("Component destroyed, unsubscribed from store.");
        };
    });

 
    function createPost(event, request){
        event.preventDefault();
        
        if (title === '' || content === '' || location === '') {
            formError = 1;
            setTimeout(() => {
                formError = 0;
            }, 3000);
            return;
        }

        fetch('/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, location })
        })
        .then(response => response.json())
        .then(idea => {
            ideas = [...ideas, idea];
        });
    }
    console.log(currentUser);
</script>

<!-- Title -->
 <div class="title">Ideas</div>


<!-- Form to create a post -->
<form method="POST" class="form" on:submit={createPost}>
    <input name="title" type="text" placeholder="Title" bind:value={title}/>
    <input name="location" placeholder="Location" type="text" bind:value={location}/>
    <textarea name="content" placeholder="Content" bind:value={content}></textarea>
    
    {#if formError === 1}
        <div class="alert">Fields required</div>
    {/if}
    <button type="submit">Create Idea</button>
</form>



<div class="posts">
    {#each ideas as idea}
        <div class="post">
            <div class="post-title">{idea.title}</div>
            <div class="post-author"><span>By : </span>{idea.author.name}</div>
            <div class="post-location"><span>Where : </span>{idea.location}</div>
            <div class="post-content"><span>What : </span>{idea.content}</div>
            <div class="post-buttons">
                {#if currentUser.id === idea.authorId && idea.date === null}
                    <form action="?/delete" method="POST">
                        <input type="text" name="id" value={idea.id} hidden>
                        <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#698474"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                    </form>
                {:else}
                <form action="?/like" method="POST">
                    <input type="text" name="id" value={idea.id} hidden>
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={idea.isLiked === 1 ? '#698474' : '#a07457'}><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></button>
                </form>
                <form action="?/dislike" method="POST">
                    <input type="text" name="id" value={idea.id} hidden>
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={idea.isLiked === 2 ? '#698474' : '#a07457'}><path d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"/></svg></button>
                </form>
                {/if}
            </div>
        </div>
    {/each}
</div>



<!-- Leave the app -->
<form action="?/logout" method="POST">
<button type="submit">Logout</button>
</form>