import { Adapter, AdapterUser, AdapterSession } from "next-auth/adapters";
import { prisma } from '../prisma'

export function PrismaAdapter(): Adapter{
    return{

        async createUser(user: AdapterUser) {
            console.log(user)

            // 1. Verifica se já existe um User com o mesmo e-mail
            let existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });

            if (existingUser) {
                console.log('User already exists, reusing:', existingUser);

                // Retorna o user existente no formato do Adapter
                return {
                    id: existingUser.id,
                    name: existingUser.name!,
                    email: existingUser.email!,
                    avatar_url: existingUser.avatar_url!,
                    emailVerified: null,
                };
            }


            // 2. Se não existe, cria o usuário normalmente
            const newUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                }
            })

            return{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                avatar_url: newUser.avatar_url,
                emailVerified: null,
            }
        },

        async getUser(id: string): Promise<AdapterUser | null>{

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id
                    }
                })

                if(!user){
                    return null
                }

                return{
                    id: user.id,
                    name: user.name!,
                    email: user.email,
                    avatar_url: user.avatar_url!,
                    emailVerified: null,
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                return null
            }

          
        },

        async getUserByEmail(email) {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!user){
                return null
            }

            return {
                id: user.id,
                name: user.name!,
                email: user.email,
                avatar_url: user.avatar_url!,
                emailVerified: null,
            }
        },

        async getUserByAccount({ providerAccountId, provider }) {
            const account = await prisma.account.findUnique({
                where: {
                    provider_provider_account_id: {
                        provider,
                        provider_account_id: providerAccountId
                    }
                },
                include: {
                    user: true
                }
            })

            if(!account){
                return null
            }

            const { user } = account

            return {
                id: user.id,
                name: user.name!,
                email: user.email,
                avatar_url: user.avatar_url!,
                emailVerified: null,
            }
        },

        async updateUser(user: Partial<AdapterUser>) : Promise<AdapterUser>  {
            
            if(!user.id){
                throw new Error("User ID is required for updating user.");
            }

            const prismaUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                }
            })

            return{
                id: prismaUser.id,
                name: prismaUser.name!,
                email: prismaUser.email!,
                emailVerified: null,
                avatar_url: prismaUser.avatar_url!,
                
              }
        },

        async linkAccount(account: { userId: string; type: string; provider: string; providerAccountId: string; refresh_token?: string; access_token?: string; expires_at?: number; token_type?: string; scope?: string; id_token?: string; session_state?: string; }) {
            await prisma.account.create({
                data: {
                    user_id: account.userId,
                    type: account.type,
                    provider: account.provider,
                    provider_account_id: account.providerAccountId,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state!,
                }
            })
        },

        async createSession({ sessionToken, userId, expires } : AdapterSession) : Promise<AdapterSession> {
            
            const session = await prisma.session.upsert({
                where: {session_token: sessionToken},
                update:{ user_id: userId, expires },
                create:{ user_id: userId, session_token: sessionToken, expires}
            });

            return {
                sessionToken: session.session_token,
                userId: session.user_id,
                expires: session.expires,
            };
            
        },

        async getSessionAndUser(sessionToken) {
            const prismaSession = await prisma.session.findUnique({
                where:{
                  session_token: sessionToken,
                },
                include:{
                  user: true,
                }
              })
    
              if(!prismaSession){
                return null
              }
    
              const {user, ...session} = prismaSession
    
              return{
                session:{
                  userId: session.user_id,
                  expires: session.expires,
                  sessionToken: session.session_token,
                },
                user: {
                  id: user.id,
                  name: user.name!,
                  email: user.email!,
                  emailVerified: null,
                  avatar_url: user.avatar_url!,
                },
              }
        },

        async updateSession({ sessionToken , userId, expires }) { 
            const prismaSession = await prisma.session.update({
                where:{
                  session_token: sessionToken
                },
                data:{
                  expires,
                  user_id: userId,
                },
              })
              
              return{
                sessionToken: prismaSession.session_token,
                userId: prismaSession.user_id,
                expires: prismaSession.expires,
              }
        },

        async deleteSession(sessionToken) {
            await prisma.session.deleteMany({
                where:{
                  session_token: sessionToken,
                },
              })
        },

       
    }
}