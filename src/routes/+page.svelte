<script>
  export let data;

  // Reactive statement
  $: posts = data.posts;

</script>

<h1>What's On This Weekend</h1>


<!-- Form to create a post -->
<form action="?/createPost" method="POST">
  <input name="title" type="text" placeholder="Title" />
  <textarea name="content" placeholder="Body"></textarea>
  <button type="submit">Create Post</button>
</form>



<!-- Loop through the posts -->
{#each posts as post}
  <div>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </div>
{/each}


<!-- Leave the app -->
<form action="?/logout" method="POST">
  <button type="submit">Logout</button>
</form>