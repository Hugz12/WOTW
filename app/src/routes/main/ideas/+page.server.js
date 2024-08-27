import prisma from '$lib/db';

export const actions = {
    delete: async ({ request, locals }) => {
        const data = await request.formData();
        const postId = data.get('id');

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(post.authorId === locals.user.id && post.isLiked === 0) {
            await prisma.post.delete({
                where: { id: postId }
            });
        }

    },

    like: async ({ request, locals }) => {
        const data = await request.formData();
        const postId = data.get('id');

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(post.authorId !== locals.user.id) {
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
        }
    },

    dislike: async ({ request, locals }) => {
        const data = await request.formData();
        const postId = data.get('id');

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if(post.authorId !== locals.user.id) {
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
        }

        return;
    }
};