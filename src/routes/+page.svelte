<script>
    export let data;

    let error = 0;


    // Form variables
    let title = '';
    let content = '';
    let location = '';

    // Reactive statement
    $: posts = data.posts;


    // function isWeekend(date) {
    //     const day = new Date(date).getDay();
    //     return day === 0 || day === 6;
    // }


 
    function createPost(event, request){
        event.preventDefault();
        console.log(title, content, location);
        
        if (title === '' || content === '' || location === '') {
            error = 1;
            setTimeout(() => {
                error = 0;
            }, 3000);
            return;
        }

        fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(post => {
            posts = [post, ...posts];
        });
    }
</script>


<!-- Form to create a post -->
<form method="POST" class="form-post" on:submit={createPost}>
    <input name="title" type="text" placeholder="Title" bind:value={title}/>
    <input name="location" placeholder="Location" type="text" bind:value={location}/>
    <textarea name="content" placeholder="Content" bind:value={content}></textarea>
    
    {#if error === 1}
        <div class="alert">Fields required</div>
    {/if}
    <button type="submit">Create Idea</button>
</form>



<div class="posts">
    {#each posts as post}
        <div class="post">
        <div class="post-title">{post.title}</div>
        <div class="post-content">{post.content}</div>
        </div>
    {/each}
</div>



<!-- Leave the app -->
<form action="?/logout" method="POST">
<button type="submit">Logout</button>
</form>