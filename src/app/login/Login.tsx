'use client'
import Image from "next/image";
import ImageHome from "../../public/assets/imagem-home.svg";
import Logo from "../../public/assets/logo.svg";
import LogoGoogle from "../../public/assets/logo-google.svg";
import LogoGitHub from "../../public/assets/logo-github.svg";
import { ArrowRight, User } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "@/utils/isAuthenticated";

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorUrl = searchParams.get('error');
    const [error, setError] = useState('');
    const isAuthenticated = useIsAuthenticated();

    async function handleLoginGoogle() {
        
        const result = await signIn("google", { redirect: true, callbackUrl: "/homeFeed" });

        if (result?.error){

            if (result.error! === "OAuthSignin") {
                setError("Você precisa aceitar as permissões de acesso ao Google Book!");
            
            }
            console.log(errorUrl);
        }
    }

    useEffect(() => {
        if (errorUrl === 'unauthorized') {
            setError("Acesse com sua conta Google e aceite as permissões do Google Book!");
        }
    }, [errorUrl]);

    async function handleLoginGitHub() {
        const result = await signIn("github", { redirect: true, callbackUrl: "/homeFeed" });
        
        if (result?.error){

             if (errorUrl === "OAuthSignin") {
                setError("Você precisa aceitar as permissões de acesso ao Google Book!");
            
            }

            console.log(errorUrl);
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="flex flex-col items-center justify-center h-screen gap-6">
                    <Image src={Logo} alt="logo" width={200} height={200} />
                    <h1 className="text-green-100 text-2xl font-bold">
                        Você já está logado!
                    </h1>
                    <button
                        className="flex bg-green-100 p-3 items-center justify-center w-44 rounded-full text-black font-bold hover:bg-green-200 gap-2"
                        onClick={() => router.push("/homeFeed")}
                    >
                        Ir para o menu <ArrowRight size={24} />
                    </button>
                </div>
            ) : (
                <div id="login" className="flex items-center justify-between h-screen max-md:flex-col max-md:gap-3">
                    <div className="flex items-center ml-6 w-[65%]">
                        <Image className="w-full h-full object-cover rounded-lg" src={ImageHome} alt="image-home" />
                    </div>

                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <div className="flex flex-col justify-start gap-10">
                            <div className="flex flex-col justify-start gap-1">
                                <h1 className="text-gray-100 text-2xl">Boas-vindas!</h1>
                                <span className="text-gray-200">Faça seu login ou acesse como visitante</span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-4">
                                <button onClick={handleLoginGoogle}>
                                    <Image src={LogoGoogle} alt="logo" width={32} height={32} />
                                    Entrar com Google
                                </button>

                                <button onClick={handleLoginGitHub}>
                                    <Image src={LogoGitHub} alt="logo" width={32} height={32} />
                                    Entrar com GitHub
                                </button>

                                <button onClick={() => router.push("/homeFeed")}>
                                    <User size={32} />
                                    Entrar como visitante.
                                </button>
                            </div>
                        </div>
                        {error != '' && <span className="text-red-500 mt-6">{error}</span>}
                    </div>
                </div>
            )}
        </>
    );
}
