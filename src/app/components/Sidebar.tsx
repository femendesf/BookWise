import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn, User } from "@phosphor-icons/react";
import Logo from "../../public/assets/logo.svg";
import Avatar from "../../public/assets/avatar.svg";
import { useState } from "react";


export function Sidebar() {
  const logado = false;
  const [selecionado, setSelecionado] = useState<string | null>(null);

  // Mapeamento para associar cada botão a um identificador único
  const buttons = [
    { id: "inicio", label: "Início", icon: <ChartLineUp size={24} /> },
    { id: "explorar", label: "Explorar", icon: <Binoculars size={24} /> },
    { id: "perfil", label: "Perfil", icon: <User size={24} />, requiresAuth: true },
  ];

  function handleButtonClick(buttonName: string) {
    setSelecionado((prev) => (prev === buttonName ? null : buttonName));
  }

  return (
    <div
      className="
        flex flex-col items-center gap-10 justify-between text-gray-100 w-[14.5rem] h-[90vh] ml-6 mt-5 rounded-xl
        bg-gradient-to-b from-purple-200/20 to-green-200/20 
        shadow-custom-dual
      "
    >
      <div className="flex flex-col gap-16 items-center">
        <Image className="mt-[2.5rem]" src={Logo} alt="image-home" />

        <div className="relative flex flex-col gap-6 text-gray-400" id="sidebar">

          {/* Div Indicadora Separada */}
          
          {selecionado && (
            <div
              className="bg-gradient-to-b from-[#7FD1CC] to-[#9694F5] w-1 h-6 rounded-full absolute transition-all duration-300"
              style={{
                top: `${
                  buttons.findIndex((btn) => btn.id === selecionado) * 48 /* Altura + margem entre os botões */
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
                      selecionado === btn.id ? "text-gray-100" : ""
                    }`}
                    onClick={() => handleButtonClick(btn.id)}
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
        !logado ?  <button className="flex gap-3 mb-12 text-gray-200">Fazer login <SignIn className="text-green-100" size={24}/></button> : <button className="flex items-center gap-3 mb-12 
        text-gray-200"><Image src={Avatar} alt="avatar"/> Cristofer <SignIn className="text-red-exit" size={24}/></button>
      }
     
    </div>
  );
}
