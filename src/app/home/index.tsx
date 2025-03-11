'use client'

import { useIsAuthenticated } from "@/utils/isAuthenticated";
import { useRouter, useSearchParams } from "next/navigation";
import Feed from "../feed/page";
import Login from "../login/page";
import { useEffect, useState } from "react";

export function Home() {
  const isAuthenticated = useIsAuthenticated();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorMessage = searchParams.get("error");

    if (errorMessage) {
      setError(errorMessage);
    }

    if (isAuthenticated) {
      router.push("/feed"); // Redireciona para Feed
    }
  }, [isAuthenticated, router, searchParams]);

  return isAuthenticated ? <Feed /> : <Login />;
}
