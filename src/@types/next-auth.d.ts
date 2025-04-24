// src/@types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User{
    id: string;
    name: string;
    email: string;
    avatar_url: string;
  }

  interface Session {
    user: User
    accessToken: string;
    refreshToken: string;
    expires_at: number;
  }


}
