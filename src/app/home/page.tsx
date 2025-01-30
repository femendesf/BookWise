'use client'

import { useState } from "react"
import { Start } from "../components/start"
import { Profile } from "../components/profile"
import { Sidebar } from "../components/Sidebar"
import { Discover } from "../components/discover"
import { Login } from "../components/Login"


export default function Home() {

  
    const [loggedIn, setLoggedIn] = useState(false)

    const [showLogin, setShowLogin] = useState(false)

    const [activePage, setActivePage] = useState<'inicio' | 'perfil' | 'explorar'>('inicio')

    return(

        <div className="flex w-full h-full ">

            <Sidebar 
                setActivePage={setActivePage}
                loggedIn={loggedIn}
                setClickedButtonLogin={setShowLogin}
                setExitLogin={setLoggedIn}
            />
        
            <div className="mt-12 ml-16 xxl:ml-24" id="home">
                {activePage === 'inicio' ? <Start loggedIn={loggedIn}/> : activePage === 'perfil' ? <Profile/> : <Discover/>}
            </div>

            {showLogin && 
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <Login 
                        setLogin={setLoggedIn}
                        setCloseLogin={setShowLogin}
                    /> 
                </div>
            }
        </div>
    )
}