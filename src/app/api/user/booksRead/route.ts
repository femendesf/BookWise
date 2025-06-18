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
            userId: session.user.id,
            provider: 'google'
        },
        select:{
            accessToken: true
        }
    })

    if(!account?.accessToken){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    try{
       
        const accessToken = await getGoogleOAuthToken(session.user.id);

        const response = await axios.get(
            'https://www.googleapis.com/books/v1/mylibrary/bookshelves/4/volumes?maxResults=40',
            {
              headers: {
                Authorization: `Bearer ${accessToken!.credentials.access_token}`,
              },
            }
        );
      
        const data = response.data;

        const books = data.items?.map((item: any) => {
            return {
                id: item.id,
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors || [],
                cover: item.volumeInfo.imageLinks?.thumbnail || "/errorCover.svg",
                rating: item.volumeInfo.averageRating || 0,
                synopsis: item.volumeInfo.description || "Descrição não disponível",
                categories: item.volumeInfo.categories || [],
                pages: item.volumeInfo.pageCount || 0,
                dateLastReading: item.userInfo.updated || "Data não disponível",
            };
        }) || [];

        return NextResponse.json({books}, {status: 200});

    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Erro inesperado'}, {status: 500});
    }
}