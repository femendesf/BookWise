// import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google";

export function buildNextAuthOptions(): NextAuthOptions{

    return{
        adapter: PrismaAdapter(),
        providers: [
            GoogleProvider(
                {
                clientId: process.env.GOOGLE_CLIENT_ID ?? '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
                authorization:{
                    params:{
                        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/books'
                    }
                },
                profile(profile: GoogleProfile){
                    return{
                        id: profile.sub,
                        name: profile.name,
                        username: '',
                        email: profile.email,
                        avatar_url: profile.picture,
                    }
                }// Para pegar o avatar do google, pois o next-auth não pega por padrão
            }
            )
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
            },

            async session({ session, user}){
                
                return{
                    ...session,
                    user,
                   
                }
            },

        }
    }
}