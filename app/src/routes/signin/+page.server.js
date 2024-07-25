import { redirect } from '@sveltejs/kit'
import prisma from '$lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '$env/static/private';


export async function load({ cookies }) {
   if (cookies.get('session')) {
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
                email: email
            }
        });

        
        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const sessionToken = jwt.sign({ 
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                    JWT_SECRET, {
                    expiresIn: '1h'
                });

                cookies.set('session', sessionToken, {
                    path: '/',
                    sameSite: 'none',
                    secure: true,
                    httpOnly: true
                });

    
                return redirect(302, '/main/ideas');
            }
        }
        return redirect(302, '/signin');
    }
};
