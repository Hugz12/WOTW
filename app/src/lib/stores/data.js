import { writable } from 'svelte/store';

export const posts = writable([]);

async function fetchPosts(){
    const response = await fetch('/api/post', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    posts.set(result);
}

async function updateFetchPosts(){
    fetchPosts();
    return setInterval(fetchPosts, 10000); // 10 seconds
}



export default posts;
export { updateFetchPosts };