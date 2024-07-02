<script>
    import { onMount } from 'svelte';
    let scrollY = 0;

    onMount(() => {
    const handleScroll = () => {
        scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
});
</script>

<style>
    .navbar {
        position: fixed;
        justify-content: space-around;
        align-items: center;
        display: flex;
        flex-direction: row;
        top: 0;
        left: 0;
        width: 100%;
        height: 8vh;
        z-index: 1000;
        cursor: pointer;
        background-color: #698474;
    }

    .navbar-title {
        font-size: 1.2em;
        font-weight: bold;
        color: #FCF8F3;
    }

    .navbar > button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

</style>

<div class="navbar">
    <!-- ajoute un logo burger-->
    <button><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FCF8F3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
    <div class="navbar-title">What's On This Weekend</div>
</div>

<!-- <div class="menu">
    <button>Logout</button>
</div> -->