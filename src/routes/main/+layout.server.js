import jwt from 'jsonwebtoken';

export async function load({ cookies }) {
    try {
        const sessionToken = cookies.get('session');
        const decoded = jwt.verify(sessionToken, 'secret');
        return {
            user: {
                id: decoded.id
            }
        };
    } catch (error) {
        console.error('Error fetching session token:', error);
        return {
            user: {
                id: null
            }
        };
    }
}