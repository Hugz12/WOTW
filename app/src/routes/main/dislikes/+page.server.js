import prisma from '$lib/db'

export const actions = {
    delete: async ({ request, locals }) => {
        const data = await request.formData()
        const postId = data.get('id')

        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (post.isLiked === 2 && post.authorId === locals.user.id) {
            await prisma.post.delete({
                where: {
                    id: postId
                }
            })
        }
    }
}