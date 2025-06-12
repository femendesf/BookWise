import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){

    try{
        const session = await getServerSession(buildNextAuthOptions())
           
        if(!session){
            return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
        }

        const booksReviewUser = await prisma.book.findMany({
        where: {
            reviews:{
                some:{
                    userId: session.user.id
                }
            }
        }
        })

        return NextResponse.json(booksReviewUser, {status: 200})

    }catch(error){
        console.error('Error fetching reviews', error);
         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}