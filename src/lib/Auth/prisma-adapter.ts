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
                    avatarUrl: existingUser.avatarUrl!,
                    emailVerified: null,
                };
            }


            // 2. Se não existe, cria o usuário normalmente
            const newUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatar_url,
                }
            })

            return{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                avatarUrl: newUser.avatarUrl,
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
                    avatar_url: user.avatarUrl!,
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
                avatar_url: user.avatarUrl!,
                emailVerified: null,
            }
        },

        async getUserByAccount({ providerAccountId, provider }) {
            const account = await prisma.account.findUnique({
                where: {
                    provider_providerAccountId: {
                        provider,
                        providerAccountId
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
                avatar_url: user.avatarUrl!,
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
                    avatarUrl: user.avatar_url,
                }
            })

            return{
                id: prismaUser.id,
                name: prismaUser.name!,
                email: prismaUser.email!,
                emailVerified: null,
                avatar_url: prismaUser.avatarUrl!,
                
              }
        },

        async linkAccount(account: { userId: string; type: string; provider: string; providerAccountId: string; refresh_token?: string; access_token?: string; expires_at?: number; token_type?: string; scope?: string; id_token?: string; session_state?: string; }) {
            await prisma.account.create({
                data: {
                    userId: account.userId,
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    refreshToken: account.refresh_token,
                    accessToken: account.access_token,
                    expiresAt: account.expires_at,
                    tokenType: account.token_type,
                    scope: account.scope,
                    idToken: account.id_token,
                    sessionState: account.session_state!,
                }
            })
        },

        async createSession({ sessionToken, userId, expires } : AdapterSession) : Promise<AdapterSession> {
            
            const session = await prisma.session.upsert({
                where: {sessionToken},
                update:{ userId, expires },
                create:{ userId, sessionToken, expires }
            });

            return {
                sessionToken: session.sessionToken,
                userId: session.userId,
                expires: session.expires,
            };
            
        },

        async getSessionAndUser(sessionToken) {
            const prismaSession = await prisma.session.findUnique({
                where:{
                  sessionToken: sessionToken,
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
                  userId: session.userId,
                  expires: session.expires,
                  sessionToken: session.sessionToken,
                },
                user: {
                  id: user.id,
                  name: user.name!,
                  email: user.email!,
                  emailVerified: null,
                  avatar_url: user.avatarUrl!,
                },
              }
        },

        async updateSession({ sessionToken , userId, expires }) { 
            const prismaSession = await prisma.session.update({
                where:{
                  sessionToken: sessionToken
                },
                data:{
                  expires,
                  userId: userId,
                },
              })
              
              return{
                sessionToken: prismaSession.sessionToken,
                userId: prismaSession.userId,
                expires: prismaSession.expires,
              }
        },

        async deleteSession(sessionToken) {
            await prisma.session.deleteMany({
                where:{
                  sessionToken: sessionToken,
                },
              })
        },

       
    }
}