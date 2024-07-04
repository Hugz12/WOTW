<script>
    import { slide } from 'svelte/transition';
    let menuVisible = false;

    const toggleMenu = () => {
        menuVisible = !menuVisible;
    }
</script>

<style>
    
    .navbar {
        position: fixed;
        justify-content: space-between;
        align-items: center;
        display: flex;
        flex-direction: row;
        top: 0;
        left: 0;
        width: 100%;
        height: 8vh;
        z-index: 1000;
        cursor: pointer;
        padding: 0 1.6em 0 1.6em;
        background-color: #698474;
        box-sizing: border-box;
    }

    .navbar-title {
        font-size: 1.2em;
        font-weight: bold;
        color: #FCF8F3;
        margin: 0 auto;
    }

    .navbar > button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .menu {
        position: fixed;
        z-index: 900;
        top: 8vh;
        left: 0;
        width: 100vw;
        height: 92vh;
        background-color: #698474;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }


    .menu-entry {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        height: 7vh;
        color: #FCF8F3;
        font-size: 1.2em;
        text-decoration: none;
        margin: 0.7em 0;
    }

    .menu-entry > * {
        margin: 0 0 0 1.1em;
    }

    .menu-entry > div {
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        width: 2.7em;
        height: 2.7em;
        background-color: #FCF8F3;
    }

</style>

<div class="navbar">
    <button on:click={toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FCF8F3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
    <div class="navbar-title">What's On This Weekend</div>
</div>

{#if menuVisible === true}
    <div class="menu" transition:slide|global>
        <a href="/main/ideas" class="menu-entry" on:click={toggleMenu}>
            <div><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#698474"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg></div>
            <span>Ideas</span>
        </a>
        <a href="/main/likes" class="menu-entry" on:click={toggleMenu}>
            <div><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#698474"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></div>        
            <span>Likes</span>
        </a>
        <a href="/main/dislikes" class="menu-entry" on:click={toggleMenu}>
            <div><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#698474"><path d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"/></svg></div>
            <span>Dislikes</span>
        </a>
        <a href="/main/planned" class="menu-entry" on:click={toggleMenu}>
            <div><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#698474"><path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg></div>
            <span>Planned</span>
        </a>
    </div>
{/if}

