'use client'

import { useEffect, useState } from "react"
import { Start } from "../components/start"
import { Profile } from "../components/profile"
import { Sidebar } from "../components/Sidebar"
import { Discover } from "../components/discover"
import { Login } from "../components/Login"

export default function Home() {

    const [loggedIn, setLoggedIn] = useState(false)// Verifica se o usuario esta logado

    const [showLogin, setShowLogin] = useState(false)//Estado para mostrar o login

    const [activePage, setActivePage] = useState<'inicio' | 'perfil' | 'explorar'>('inicio') //Para mostrar os componentes na tela conforme esta clicado no Sidebar


    useEffect(()=>{

        if(activePage === 'perfil'){
            setActivePage('inicio')
        }

    },[loggedIn]) // Atualiza a marcação do SideBar para voltando ao inicio quando o usuario esta no componente perfil e aperta para desconectar

    function handleChangeComponent(page: 'inicio' | 'perfil' | 'explorar') {
        setActivePage(page);
    }

    return(

        <div className="flex w-full h-full ">

            <Sidebar 
                activePage={activePage}
                setActivePage={handleChangeComponent}
                loggedIn={loggedIn}
                setClickedButtonLogin={setShowLogin}
                setExitLogin={setLoggedIn}
            />
        
            <div className="mt-12 ml-16 xxl:ml-24" id="home">
                {activePage === 'inicio' ? <Start setButtonSeeAll={handleChangeComponent} loggedIn={loggedIn}/> : activePage === 'perfil' ? <Profile/> : <Discover/>}
            </div>

            {showLogin && 
                <Login 
                    setLogin={setLoggedIn}
                    setCloseLogin={setShowLogin}
                /> 
            }{/*Mostra a tela de login se tiver clicado no botão de fazer login */}


        </div>
    )
}