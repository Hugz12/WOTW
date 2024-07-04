import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your_secret_here"; // Remplacez par votre clé secrète JWT

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/main")) {
        const sessionToken = event.cookies.get("session");

        if (!sessionToken) {
            console.log("no session token");
            throw redirect(302, "/signin");
        } else {
            try {
                const decoded = jwt.verify(sessionToken, "secret");
            } catch (error) {
                event.cookies.delete("session", { path: "/" });
                throw redirect(302, "/signin");
            }
        }
    }


    return await resolve(event); // Continue 
}
