import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { dbUser } from "@/database";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    pages: {
        signIn: '/',
    },

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada día
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUser.oAuthToDbUser(user?.email || '', user?.name || '');
                        break;
                }

            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions)