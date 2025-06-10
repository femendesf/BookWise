'use client'

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"

interface Props{
    children: React.ReactNode
    session?: Session | null
}

export default function AuthProvider({ children, session }: Props){
    return(
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </QueryClientProvider>
    )
}