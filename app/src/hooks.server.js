import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
const JWT_SECRET = "your_secret_here"; // Remplacez par votre clé secrète JWT


export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/main")) {
        const sessionCookie = event.cookies.get("session");

        if (!sessionCookie) {
            throw redirect(302, "/signin");
        } else {
            try {
                const sessionJwt = jwt.verify(sessionCookie, "secret");
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
