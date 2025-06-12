import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(buildNextAuthOptions())
           
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }
    
    const response = await prisma.account.findFirst({
        where: {
            userId: session.user.id
        },
        select: {
            accessToken: true,
        }
    })

    

    return NextResponse.json(response, {status: 200})
        
}