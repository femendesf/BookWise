// import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function buildNextAuthOptions(): NextAuthOptions{

    return{
        
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',    
            })
        ]
    }
}