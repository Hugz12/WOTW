import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();

export async function POST({ request, cookies }) {
	const data = await request.json();
    const title = data.title;
    const content = data.content;
    console.log(data);

    const sessionToken = cookies.get("session");
    const decoded = jwt.verify(sessionToken, "secret");

    const create = await prisma.post.create({
        data: {
            title,
            content,
            authorId: decoded.id
        }
    });

    console.log(create);

    return json(create);
    

}