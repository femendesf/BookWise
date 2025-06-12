import { google } from "googleapis";
import { prisma } from "./prisma";
import dayjs from "dayjs";

export async function getGoogleOAuthToken(userId: string){

    const account = await prisma.account.findFirst({
        where:{
            provider: 'google',
            userId: userId
        }
    })

      if (!account) {
        // Não tem conta Google, retorna null ou lança erro específico
        return null;
    }
    // Authenticate with Google using OAuth2
    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
    )

    auth.setCredentials({
        access_token: account.accessToken,
        refresh_token: account.refreshToken,
        expiry_date: account.expiresAt ? account.expiresAt * 1000 : null
    })

    
    //--------------------------------------------------------------------------------
    
    
    if(!account.expiresAt){
        return auth
    }

    const isTokenExpired = dayjs(account.expiresAt * 1000).isBefore((new Date()))

    // Check if the token is expired
    if(isTokenExpired){
         if (!account.refreshToken) {
            console.warn(`Usuário ${userId} não possui refresh_token salvo para renovar o token.`);
            return null;
        }
        
        const { credentials } = await auth.refreshAccessToken()

        const {access_token, expiry_date, id_token, refresh_token, scope, token_type} = credentials

        await prisma.account.update({
            where:{
                id: account.id
            },
            data:{
                accessToken: access_token,
                expiresAt: expiry_date ? Math.floor(expiry_date / 1000) : null,
                idToken: id_token,
                refreshToken: refresh_token,
                scope,
                tokenType: token_type
            }
        })

        auth.setCredentials({
            access_token,
            refresh_token,
            expiry_date
        })
    }

    return auth
}