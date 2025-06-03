// import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
                        prompt: 'consent',
                        access_type: 'offline',
                        response_type: 'code',
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
            ),

            GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID ?? '',
                clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
                profile(profile){
                    return{
                        id: profile.id.toString(),
                        name: profile.name!,
                        username: profile.login,
                        email: profile.email,
                        avatar_url: profile.avatar_url,
                    }
                }
            })
        ],
        pages:{
            error: '/'
        },
        callbacks:{
            async signIn({ account }){
                 if (account?.provider === 'google') {
                    if (!account.scope?.includes('https://www.googleapis.com/auth/books')) {
                        return false;
                    }
                }
                return true;
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