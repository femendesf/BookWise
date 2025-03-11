// import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function buildNextAuthOptions(): NextAuthOptions{

    return{
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
                authorization:{
                    params:{
                        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/books'
                    }
                }
            })
        ],
        pages:{
            error: '/'
        },
        callbacks:{
            async signIn({ account }){
                if(!account?.scope?.includes('https://www.googleapis.com/auth/books')){
                    return false
                }
                return true
            }
        }
    }
}