import { dbUser } from "@/database";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

export const authOptions = {
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials) {
                return await dbUser.findUser(credentials!.email, credentials!.password)
            }
        }),
    ],

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },
}

export default NextAuth(authOptions)