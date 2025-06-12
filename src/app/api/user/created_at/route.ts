import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { buildNextAuthOptions } from "@/utils/buildAuth";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
    const session = await getServerSession(buildNextAuthOptions())
   
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { createdAt: true },
  });

  if (!user) {
    return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
  }

  return NextResponse.json({user}, {status: 200});
}
