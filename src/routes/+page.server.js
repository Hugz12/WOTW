import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export const load = async ({ request, locals, cookies }) => {
    // Get all the posts from the database
    const posts = await prisma.post.findMany();
    return {
        posts
    };
};

export const actions = {
    logout: async ({ request, locals, cookies }) => {
        cookies.delete("session", { path: "/" });
        return redirect(302, "/");
    },

    // createPost: async ({ request, locals, cookies }) => {
    //     const data = await request.formData();

    //     const title = data.get("title");
    //     const content = data.get("content");

    //     const sessionToken = cookies.get("session");

    //     const decoded = jwt.verify(sessionToken, "secret");
        
    //     await prisma.post.create({
    //         data: {
    //             title,
    //             content,
    //             authorId: decoded.id
    //         }
    //     });
    // }
};