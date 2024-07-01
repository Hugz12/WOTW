import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "your_secret_here"; // Remplacez par votre clé secrète JWT

export async function handle({ event, resolve }) {
    if (event.url.pathname === "/") {
        const sessionToken = event.cookies.get("session");

        if (!sessionToken) {
            console.log("no session token");
            return redirect(302, "/signin");
        } else {
            try {
                // Decode the session token
                const decoded = jwt.verify(sessionToken, "secret");
                console.log(decoded);

                const user = await prisma.user.findUnique({
                    where: {
                        id: decoded.id,
                    },
                });

                if (!user) {
                    console.log("no user found");
                    return redirect(302, "/signin");
                }
            } catch (error) {
                console.error("JWT verification error:", error.message);
                return redirect(302, "/signin");
            }
        }
    }


    return await resolve(event);
}
