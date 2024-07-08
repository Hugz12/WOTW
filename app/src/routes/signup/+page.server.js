import { redirect } from '@sveltejs/kit'
import prisma from '$lib/db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const actions = {
    default: async ({ cookies, request }) => {
        console.log('signup page');
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const name = data.get('name');

        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword
            }
        });

        const sessionToken = jwt.sign({ 
            id: user.id,
            email: user.email,
            name: user.name
         },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        cookies.set('session', sessionToken, {
            path: '/'
        });

        return redirect(302, '/');

    }
};
