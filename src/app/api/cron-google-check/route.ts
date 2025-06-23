import { runGoogleBooksPermissionCheck } from '@/cron/runGoogleBooksPermissions';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await runGoogleBooksPermissionCheck();

    return NextResponse.json({ message: "Google Books check completed." }, { status: 200 });
  } catch (error) {
    console.error("Erro no cron de permissão Google Books:", error);
    return NextResponse.json({ error: "Erro na verificação" }, { status: 500 });
  }
}