import { redirect } from '@sveltejs/kit'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function load({ cookies }) {
   if (cookies.session) {
       throw redirect(302, '/main/ideas');
   }
}


export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        });

        if (!user) {
            return {
                status: 401,
                body: {
                    message: 'Invalid email or password'
                }
            };
        } else {
            const sessionToken = jwt.sign({ 
                id: user.id,
                email: user.email,
                name: user.name
             },
                'secret', {
                expiresIn: '1h'
            });

            cookies.set('session', sessionToken, {
                path: '/'
            });

            return redirect(302, '/main/ideas');
        }
    }
};
