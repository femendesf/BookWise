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

    console.log(`*******************************************************************************************************************************************`, account.access_token)
    try{
        const response = await fetch('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
            headers: {
                Authorization: `Bearer ${account.access_token}`
            }
        })

        if(!response.ok){
            return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
        }
        
        const data = await response.json()

        const totalBooksRead = data.totalItems || 0;

        await prisma.user.update({
            where:{id: session.user.id},
            data:{
                totalBookRead: totalBooksRead
            }
        })

        return NextResponse.json({totalBooksRead}, {status: 200});

    }catch(error){
        console.log(error)
        return NextResponse.json({error: 'Erro inesperado'}, {status: 500});
    }
}