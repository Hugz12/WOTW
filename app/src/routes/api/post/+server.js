import { json } from '@sveltejs/kit';
import prisma from '$lib/db';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export async function POST({ request, cookies }) {
	const data = await request.json();
    const title = data.title;
    const content = data.content;
    const location = data.location;

    const sessionToken = cookies.get("session");
    const decoded = jwt.verify(sessionToken, JWT_SECRET);

    const create = await prisma.post.create({
        data: {
            title,
            content,
            authorId: decoded.id,
            location,
            date: null
        }
    });

    const postWithAuthor = await prisma.post.findUnique({
        where: {
            id: create.id
        },
        include: {
            author: true
        }
    });

    console.log(postWithAuthor);

    return json(postWithAuthor);
}



export async function GET({ request, cookies }) {
    try {
        const sessionToken = cookies.get("session");
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
    
        const posts = await prisma.post.findMany({
            include: {
            author: true
            }
        });

        return json({ data: posts, error: false });
    } catch (error) {
        return json({ data: null, error: true });
    }

}