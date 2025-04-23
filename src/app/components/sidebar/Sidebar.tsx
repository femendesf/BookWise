import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn, User } from "@phosphor-icons/react";
import Logo from "../../../public/assets/logo.svg";
import { PhotoProfile } from "../PhotoProfile";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";

import { signOut } from "next-auth/react";

import { api } from "@/lib/axios";
interface SidebarProps{
  activePage: 'inicio' | 'perfil' | 'explorar' ;
  avatar_url: string;
  name: string;

  setActivePage : (page: 'inicio' | 'perfil' | 'explorar') => void;
  setClickedButtonLogin: (clicked: boolean) => void;
  isAuthenticated: boolean;
 
}

export function Sidebar({activePage,avatar_url, name, isAuthenticated, setActivePage, setClickedButtonLogin,} : SidebarProps) {


  // Mapeamento para associar cada botão a um identificador único
  const buttons = [
    { id: "inicio", label: "Início", icon: <ChartLineUp size={24} /> },
    { id: "explorar", label: "Explorar", icon: <Binoculars size={24} /> },
    { id: "perfil", label: "Perfil", icon: <User size={24} />, requiresAuth: true },
  ];

  function handleButtonClick(buttonName: 'inicio' | 'perfil' | 'explorar') {
    setActivePage(buttonName); 
  }

  console.log(activePage);
  async function handleLogout() {

    await api.get("/auth/logout"); // Remove os cookies no backend
    await signOut({ redirect: true, callbackUrl: "/feed" }); // Faz logout no NextAuth

    setActivePage(activePage); 
  }



  return (

      <motion.div 
        className="
            flex flex-col items-center gap-10 justify-between text-gray-100 min-w-60 h-[90vh] max-w-64 ml-6 mt-5 rounded-xl
            bg-gradient-to-b from-purple-200/20 to-green-200/20 
            shadow-custom-dual px-6
        "
        {...fadeIn}
      >
        <div className="flex flex-col gap-16 items-center">
          <Image className="mt-[2.5rem] hover:cursor-pointer" src={Logo} alt="image-home" onClick={() => setActivePage('inicio')} />

          <div className="relative flex flex-col gap-6 text-gray-400" id="sidebar">

            {/* Div Indicadora Separada */}
            
            {activePage && (
              <div
                className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] w-1 h-6 rounded-full absolute transition-all duration-300"
                style={{
                  top: `${
                    buttons.findIndex((btn) => btn.id === activePage) * 48 /* Altura + margem entre os botões */
                  }px`,
                  left: -20,
                }}
              />
            )}

              {/* Botões */}

              {buttons
                .filter((btn) => !btn.requiresAuth || isAuthenticated)
                .map((btn) => (
                  
                  <div className="flex items-center gap-4" key={btn.id}>
                    <button
                      className={`flex items-center gap-3 hover:text-gray-100 ${
                        activePage === btn.id ? "text-gray-100" : ""
                      }`}
                      onClick={() => handleButtonClick(btn.id as "inicio" | "perfil" | 'explorar')}
                    >
                      <span className={`${activePage === btn.id && 'text-green-100'}`}>{btn.icon}</span>
                      {btn.label}
                    </button>
                  </div>
                ))}
          </div>
        </div>
        
       
        <motion.div
          key={isAuthenticated ? "clicked" : "default"}
          {...fadeIn}
        >
          {
            !isAuthenticated ?  
              <button 
                className="flex items-center justify-center gap-3 mb-12 text-gray-200"
                onClick={() => setClickedButtonLogin(true)}
              >
                Fazer login 
                <SignIn className="text-green-100" size={24}/>
              </button> : 
              
              <button 
                className="flex flex-shrink-0 items-center justify-center gap-3  mb-12 
            text-gray-200 overflow-hidden"
                onClick={() => handleLogout()}
              >
                <PhotoProfile 
                  imageUrl={avatar_url}
                  size='2rem'

                /> 
                  <span className="truncate max-w-[120px]">{name.split(" ")[0]}</span>
                  <SignIn className="text-red-exit" size={24}/>
              </button>
          } 
        </motion.div>{/* Botão de Login */}
    </motion.div>
  );
}