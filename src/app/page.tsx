'use client'
import Image from "next/image";
import ImageHome from "../public/assets/imagem-home.svg";
import LogoGoogle from "../public/assets/logo-google.svg";
import LogoGitHub from "../public/assets/logo-github.svg";
import { User } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()

  return (
    <div id="login" className="flex  items-center justify-center gap-56 w-full h-screen max-md:flex-col max-md:gap-3">

      <div className="mt-6 ">
        <Image className="rounded-lg" src={ImageHome} alt="image-home" 
        />
      </div>
      
      <div className="flex flex-col items-center justify-center">

        <div className="flex flex-col justify-start gap-10">

          <div className="flex flex-col justify-start gap-1">
            <h1 className="text-gray-100 text-2xl">Boas vindas!</h1>
            <span className="text-gray-200">Faça seu login ou acesse como visitante
            </span>
          </div>
        
          <div className="flex flex-col items-center justify-center gap-4">

            <button> 
              <Image src={LogoGoogle} alt="logo" width={32} height={32}/>  Entrar com Google
            </button>

            <button>
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
  );
}