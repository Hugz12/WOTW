    <script>
    export let data;

    let currentScene = 0;
    let error = 0;


    // Form variables
    let title;
    let content;
    let date;

    // Reactive statement
    $: posts = data.posts;

    function switchScene(number){
        currentScene = number;
        const buttons = document.querySelectorAll('.buttons button');

        buttons.forEach((button, index) => {
            if(index === number){
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }


    function isWeekend(date) {
        const day = new Date(date).getDay();
        return day === 0 || day === 6;
    }


 
    function createPost(event, request){
        event.preventDefault();
        
        if (title === '' || content === '' || !isWeekend(date)) {
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
        <textarea name="content" placeholder="Body" bind:value={content}></textarea>
        <input type="date" bind:value={date}/>
        {#if error === 1}
            <div class="alert">Select weekend day & fill the fields</div>
        {/if}
        <button type="submit">Create Post</button>
        
        
    </form>


    <!-- Bouton to select the view -->
    <div class="buttons">
        <button class="active" on:click={() => switchScene(0)}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg></button>
        <button on:click={() => switchScene(1)}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/></svg></button>
        <button on:click={() => switchScene(2)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></button>
    </div>


    <!-- Loop through the posts -->
    {#if currentScene === 0}
        <div class="posts">
            {#each posts as post}
                <div class="post">
                <div class="post-title">{post.title}</div>
                <div class="post-content">{post.content}</div>
                </div>
            {/each}
        </div>
    {/if}



    <!-- Leave the app -->
    <form action="?/logout" method="POST">
    <button type="submit">Logout</button>
    </form>