// src/@types/next-auth.d.ts
import NextAuth from "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {} // Usa todos os campos do Prisma

  interface Session {
    user: User;
  }
}
