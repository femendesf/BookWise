import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn, User } from "@phosphor-icons/react";
import Logo from "../../public/assets/logo.svg";
import Avatar from "../../public/assets/avatar.svg";
import { useState } from "react";
import { PhotoProfile } from "./PhotoProfile";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";

interface SidebarProps{
  setActivePage : (page: 'inicio' | 'perfil' | 'explorar') => void;
}

export function Sidebar({setActivePage} : SidebarProps) {

  const logado = true;
  const [selected, setSelected] = useState<string | null>('inicio');

  const imgUrl = Avatar.src;
  // Mapeamento para associar cada botão a um identificador único
  const buttons = [
    { id: "inicio", label: "Início", icon: <ChartLineUp size={24} /> },
    { id: "explorar", label: "Explorar", icon: <Binoculars size={24} /> },
    { id: "perfil", label: "Perfil", icon: <User size={24} />, requiresAuth: true },
  ];

  function handleButtonClick(buttonName: 'inicio' | 'perfil' | 'explorar') {
    setSelected(buttonName);
    setActivePage(buttonName); 

  }

  return (

      <motion.div 
        className="
            flex flex-col items-center gap-10 justify-between text-gray-100 w-[14.5rem] h-[90vh] ml-6 mt-5 rounded-xl
            bg-gradient-to-b from-purple-200/20 to-green-200/20 
            shadow-custom-dual
        "
        {...fadeIn}
      >
        <div className="flex flex-col gap-16 items-center">
          <Image className="mt-[2.5rem]" src={Logo} alt="image-home" />

          <div className="relative flex flex-col gap-6 text-gray-400" id="sidebar">

            {/* Div Indicadora Separada */}
            
            {selected && (
              <div
                className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] w-1 h-6 rounded-full absolute transition-all duration-300"
                style={{
                  top: `${
                    buttons.findIndex((btn) => btn.id === selected) * 48 /* Altura + margem entre os botões */
                  }px`,
                  left: -20,
                }}
              />
            )}

              {/* Botões */}

              {buttons
                .filter((btn) => !btn.requiresAuth || logado)
                .map((btn) => (
                  
                  <div className="flex items-center gap-4" key={btn.id}>
                    <button
                      className={`flex items-center gap-3 hover:text-gray-100 ${
                        selected === btn.id ? "text-gray-100" : ""
                      }`}
                      onClick={() => handleButtonClick(btn.id as "inicio" | "perfil" | 'explorar')}
                    >
                      {btn.icon}
                      {btn.label}
                    </button>
                  </div>
                ))}
          </div>
        </div>
        
        {/* Botão de Login */}
        {
          !logado ?  
            <button className="flex gap-3 mb-12 text-gray-200">
              Fazer login 
              <SignIn className="text-green-100" size={24}/>
            </button> : 
            
            <button className="flex items-center gap-3 mb-12 
          text-gray-200">
              <PhotoProfile 
                imageUrl={imgUrl}
                size='2rem'
                width={32}
                height={32}
              /> 
                Cristofer 
                <SignIn className="text-red-exit" size={24}/>
            </button>
        }
    </motion.div>
  );
}
