// 
// COMPONENTE TESTE
// 
// 'use client'

// import { useIsAuthenticated } from "@/utils/isAuthenticated";
// import { useRouter } from "next/navigation";
// import { useEffect} from "react";

// import PageFeed from "../feed/page";
// import Login from "../login/page";
// export function Home() {
//   const isAuthenticated = useIsAuthenticated();

//   const router = useRouter();
  
//   useEffect(() => {

//     if (isAuthenticated) {
//       return router.push("/feed"); // Redireciona para Feed
//     } else{
//       return router.push("/login"); // Redireciona para Login
//     }
//   }, [isAuthenticated, router,]);

//   return isAuthenticated ? <PageFeed /> : <Login />;
// }
