import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { getContext } from 'svelte';
import prisma from '$lib/db';

export const actions = {


    logout: async ({ cookies }) => {
        cookies.delete("session", { path: "/" });
        return redirect(302, "/");
    },

    delete: async ({ request, cookies }) => {
        
        await prisma.post.delete({
            where: {
                id: postId
            }
        });

    },

    like: async ({ request }) => {
        const data = await request.formData();
        const postId = data.get('id');

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });


        if (post.isLiked === 1) {
            await prisma.post.update({
                where: { id: postId },
                data: { isLiked: 0 }
            });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: { isLiked: 1 }
            });
        }

        return;
    },

    dislike: async ({ request }) => {
        const data = await request.formData();
        const postId = data.get('id');
        
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });


        if (post.isLiked === 2) {
            await prisma.post.update({
                where: { id: postId },
                data: { isLiked: 0 }
            });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: { isLiked: 2 }
            });
        }

        return;
    }
};