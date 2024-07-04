<!-- signin/+page.svelte -->

<div class="title">Sign In</div>


<form class="form" action="/signin" method="POST">
  <input type="text" name="email" placeholder="email" />
  <input type="password" name="password" placeholder="Password" />
  <button type="submit">Sign in</button>
</form>