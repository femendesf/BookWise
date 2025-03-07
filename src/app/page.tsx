"use client";

import { useIsAuthenticated } from "@/utils/isAuthenticated";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home"); // Redireciona para Home
    } else {
      router.push("/login"); // Redireciona para Login
    }
  }, [isAuthenticated, router]);

  return null; // Não renderiza nada enquanto redireciona
}
