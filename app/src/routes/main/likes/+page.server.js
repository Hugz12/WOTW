import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { getContext } from 'svelte';
import prisma from '$lib/db';

export const actions = {


    addDate: async ({ request }) => {
        const data = await request.formData();
        const postId = data.get('id');
        const date = data.get('date');
        const isoDate = new Date(date).toISOString();

        await prisma.post.update({
            where: { id: postId },
            data: { date: isoDate }
        });

        return;
    }


};