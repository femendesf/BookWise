// src/@types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      avatar_url: string;
      hasGoogleBooksPermission?: boolean;
    };
    accessToken: string;
    refreshToken: string;
    expires_at: number;
  }

  interface User extends DefaultUser {
    avatar_url: string;
    hasGoogleBooksPermission?: boolean;
  }
}
