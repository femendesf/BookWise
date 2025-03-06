import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Exclui os cookies do NextAuth
  response.cookies.set("next-auth.session-token", "", { maxAge: -1 });
  response.cookies.set("next-auth.csrf-token", "", { maxAge: -1 });

  return response;
}
