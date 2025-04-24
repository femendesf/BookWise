import { getGoogleOAuthToken } from "@/lib/google";
import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse){

    const session = await getServerSession(buildNextAuthOptions())
       
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    const account = await prisma.account.findFirst({
        where:{
            user_id: session.user.id,
            provider: 'google'
        },
        select:{
            access_token: true
        }
    })

    if(!account?.access_token){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    try{
       
        const accessToken = await getGoogleOAuthToken(session.user.id);

        const response = await axios.get(
            'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/volumes?maxResults=40',
            {
              headers: {
                Authorization: `Bearer ${accessToken.credentials.access_token}`,
              },
            }
          );
      
        const data = response.data;

        const books = response.data.items || [];
        const totalBooksRead = data.totalItems || 0;

        await prisma.user.update({
            where:{id: session.user.id},
            data:{
                totalBookRead: totalBooksRead
            }
        })

        return NextResponse.json({totalBooksRead, books}, {status: 200});

    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Erro inesperado'}, {status: 500});
    }
}