'use client'

import { useIsAuthenticated } from "@/utils/isAuthenticated";
import { useRouter } from "next/navigation";
import { useEffect} from "react";


// Para forçar logout e resetar a sessão:

export default function Home() {
  
  const isAuthenticated = useIsAuthenticated();

  const router = useRouter();
  
  useEffect(() => {

    if (isAuthenticated) {
      router.push("/feed"); // Redireciona para Feed
    } else{
      router.push("/login"); // Redireciona para Login
    }
  }, [isAuthenticated, router,]);

  return null
}
