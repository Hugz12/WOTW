import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";


export async function handle({ event, resolve }) {
    if (!event.url.pathname.startsWith("/signin")) {
        const sessionCookie = event.cookies.get("session");
        if (!sessionCookie) {
            throw redirect(302, "/signin");
        } else {
            try {
                const sessionJwt = jwt.verify(sessionCookie, JWT_SECRET);
                event.locals.user = {
                    id: sessionJwt.id,
                    email: sessionJwt.email,
                    name: sessionJwt.name
                };
            } catch (error) {
                event.cookies.delete("session", { path: "/" });
                throw redirect(302, "/signin");
            }
        }
    }
    


    return await resolve(event); // Continue 
}
