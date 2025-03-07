'use client'
import Image from "next/image";
import ImageHome from "../../public/assets/imagem-home.svg";
import LogoGoogle from "../../public/assets/logo-google.svg";
import LogoGitHub from "../../public/assets/logo-github.svg";
import { User } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useIsAuthenticated } from "@/utils/isAuthenticated";

export default function Login() {
  const router = useRouter()

  async function handleLoginGoogle(){
    await signIn('google', {
      redirect: true,
      callbackUrl: '/home'
    })
  }

  async function handleLoginGitHub(){
    await signIn('github', {
      redirect: true,
      callbackUrl: '/home'
    })
  }

  const isAuthenticated = useIsAuthenticated()

  console.log(isAuthenticated);
  
  return (
    <>
        {isAuthenticated ? 
        
            <div>
                <h1 className="text-gray-100">VOCE JA ESTA LOGADO</h1>
            </div>

          :
            <div id="login" className="flex items-center justify-between h-screen max-md:flex-col max-md:gap-3 ">

                <div className="flex items-center ml-6 w-[65%] ">
                    <Image className="w-full h-full object-cover rounded-lg" src={ImageHome} alt="image-home" />
                </div>

                <div className="flex flex-col w-full h-full items-center justify-center">

                <div className="flex flex-col justify-start gap-10">

                    <div className="flex flex-col justify-start gap-1">
                        <h1 className="text-gray-100 text-2xl">Boas vindas!</h1>
                        <span className="text-gray-200">Faça seu login ou acesse como visitante
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">

                        <button onClick={() => handleLoginGoogle()}> 
                            <Image src={LogoGoogle} alt="logo" width={32} height={32}/>  Entrar com Google
                        </button>

                        <button >
                            <Image src={LogoGitHub} alt="logo" width={32} height={32}/>
                            Entrar com GitHub
                        </button>
                    
                        <button onClick={() => router.push('/home')}>
                            <User size={32} />
                            Entrar como visitante.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
    </>
    
  );
}