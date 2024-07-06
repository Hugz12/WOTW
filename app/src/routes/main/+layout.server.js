export async function load({ locals }) {
    return {
        user: {
            id: locals.user.id,
            email: locals.user.email,
            name: locals.user.name
        }
    };
}