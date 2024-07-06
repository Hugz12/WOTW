import { redirect } from '@sveltejs/kit'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();



export async function load({ cookies }) {
    const sessionToken = cookies.get('session');
    return {
        info: {
            sessionToken
        }
    }
}


export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password
            }
        });

        const sessionToken = jwt.sign({ id: user.id },
            'secret', {
            expiresIn: '1h'
        });

        cookies.set('session', sessionToken, {
            path: '/'
        });

        return redirect(302, '/');

    }
};
