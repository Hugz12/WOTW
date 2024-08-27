import { json } from '@sveltejs/kit';

export async function POST({ cookies }){
    try {
        cookies.delete("session", { path: "/" });
        return json({ status: 200 });
    } catch (error) {
        return json({ status: 500 });
    }
}