'use client'

import Image from "next/image";
import LogoGoogle from "../../public/assets/logo-google.svg";
import LogoGitHub from "../../public/assets/logo-github.svg";
import { X } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { api } from "@/lib/axios";

interface LoginProps{
   
    setCloseLogin: (value: boolean) => void;
}

export function BoxLogin({setCloseLogin} : LoginProps){

    async function handleButtonLogin(provider: "google" | "github") {
        
        const result = await signIn(provider, { redirect: false });

        if (result?.ok) {

           

           setCloseLogin(false)


        }
    }
    
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex flex-col w-[32.25rem] h-[21.0625rem] bg-gray-750 gap-4 p-3 rounded-lg shadow-lg">

                <button onClick={() => setCloseLogin(false)} className="absolute top-4 right-4 bg-gray-650 p-2 rounded hover:bg-gray-500">
                    <X className="text-purple-100 " width={24} height={24}/>
                </button>

                <div className=" flex flex-col items-center justify-center mt-12 gap-10">

                    <span className="text-base text-gray-200">Faça login para deixar sua avaliação</span>
    
                    <div className="flex flex-col gap-3" id="login">
                        <button onClick={() => handleButtonLogin('google')}> 
                <           Image src={LogoGoogle} alt="logo" width={32} height={32}/>  
                            Entrar com Google
                        </button>

                        <button onClick={() => handleButtonLogin('github')}>
                            <Image src={LogoGitHub} alt="logo" width={32} height={32}/>
                            Entrar com GitHub
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
       
    )
}