import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import { checkGoogleBooksPermission } from "@/cron/checkGoogleBooksPemission";

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: string; // Adicione a propriedade 'provider' aqui
  }

   interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      avatar_url?: string | null
      hasGoogleBooksPermission?: boolean // ← adiciona aqui
    }
  }

  interface User {
    hasGoogleBooksPermission?: boolean
  }
}
export function buildNextAuthOptions(): NextAuthOptions {
  
  return {
    adapter: PrismaAdapter(),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope:
              "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/books",
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: "",
            email: profile.email,
            avatar_url: profile.picture,
          };
        },
      }),

      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        profile(profile) {
          return {
            id: profile.id.toString(),
            name: profile.name!,
            username: profile.login,
            email: profile.email,
            avatar_url: profile.avatar_url,
          };
        },
      }),
    ],

    pages: {
      error: "/", // redireciona em caso de erro
    },

    callbacks: {

        async signIn({ user, account  }) {
            if (!user.email) return false;
          
            // Verifica se já existe user com mesmo email
            const existingUser = await prisma.user.findUnique({
              where: { email: user.email },
            });

            if (existingUser) {
              const existingAccount = await prisma.account.findUnique({
                  where: {
                  provider_provider_account_id: {
                      provider: account!.provider,
                      provider_account_id: account!.providerAccountId,
                  },
                  },
              });

              // Se ainda não tiver uma conta vinculada com esse provider, vincula
              if (existingAccount) {
                await prisma.account.update({
                  where: {
                    provider_provider_account_id: {
                      provider: account!.provider,
                      provider_account_id: account!.providerAccountId,
                    },
                  },
                  data: {
                    // Preserve o refresh_token antigo se o novo for undefined
                    refresh_token: account!.refresh_token ?? existingAccount.refresh_token,
                    access_token: account!.access_token,
                    expires_at: account!.expires_at,
                    token_type: account!.token_type,
                    scope: account!.scope,
                    id_token: account!.id_token,
                    session_state: account!.session_state,
                  },
                });
              } else {
                  await prisma.account.create({
                    data: {
                      user_id: existingUser.id,
                      type: account!.type,
                      provider: account!.provider,
                      provider_account_id: account!.providerAccountId,
                      refresh_token: account!.refresh_token,
                      access_token: account!.access_token,
                      expires_at: account!.expires_at,
                      token_type: account!.token_type,
                      scope: account!.scope,
                      id_token: account!.id_token,
                      session_state: account!.session_state,
                    },
                  });
              }

              if (account?.provider === "google") {
                if (!account.scope?.includes("https://www.googleapis.com/auth/books")) {
                    return false;
                }
              }

              // Verifica e atualiza o campo hasGoogleBooksPermission
              await checkGoogleBooksPermission(existingUser.id);
            }

            return true;
        },

        async session({ session, user }) {

          return {
            ...session,
            user: {
              ...session.user,
              id: user.id,
              avatar_url: user.avatar_url,
              hasGoogleBooksPermission: user.hasGoogleBooksPermission,
            },
          };
        },

    },
  };
}

// import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider, {GoogleProfile} from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// export function buildNextAuthOptions(): NextAuthOptions{

//     return{
//         adapter: PrismaAdapter(),
//         providers: [
//             GoogleProvider(
//                 {
//                 clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//                 clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//                 authorization:{
//                     params:{
//                         prompt: 'consent',
//                         access_type: 'offline',
//                         response_type: 'code',
//                         scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/books'
//                     }
//                 },
//                 profile(profile: GoogleProfile){
//                     return{
//                         id: profile.sub,
//                         name: profile.name,
//                         username: '',
//                         email: profile.email,
//                         avatar_url: profile.picture,
//                     }
//                 }// Para pegar o avatar do google, pois o next-auth não pega por padrão
//             }
//             ),

//             GitHubProvider({
//                 clientId: process.env.GITHUB_CLIENT_ID ?? '',
//                 clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
//                 profile(profile){
//                     return{
//                         id: profile.id.toString(),
//                         name: profile.name!,
//                         username: profile.login,
//                         email: profile.email,
//                         avatar_url: profile.avatar_url,
//                     }
//                 }
//             })
//         ],
//         pages:{
//             signIn: '/login',
//             error: '/'
//         },
//         callbacks:{
//             async signIn({ account }){
//                  if (account?.provider === 'google') {
//                     if (!account.scope?.includes('https://www.googleapis.com/auth/books')) {
//                         return false;
//                     }
//                 }
//                 return true;
//             },

//             async session({ session, user}){
                
//                 return{
//                     ...session,
//                     user,
                   
//                 }
//             },

//         }
//     }
// }