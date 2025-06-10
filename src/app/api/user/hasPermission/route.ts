import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(buildNextAuthOptions())
           
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 404 });
    }
    
    const response = await prisma.user.findFirst({
        where: {
            id: session.user.id
        },
        select: {
            hasGoogleBooksPermission: true,
        }
    })

    if(!response){
        return NextResponse.json({error: 'Usuário não encontrado'}, {status: 404 });
    }

    console.log('HasGooglePermission:' , response?.hasGoogleBooksPermission)

    return NextResponse.json({ hasGoogleBooksPermission: response.hasGoogleBooksPermission }, {status: 200})
        
}