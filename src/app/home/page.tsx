'use client'

import { useState } from "react"
import { Inicio } from "../components/start"
import { Profile } from "../components/profile"
import { Sidebar } from "../components/Sidebar"
import { Discover } from "../components/discover"


export default function Home() {

    const logado = true

    const [activePage, setActivePage] = useState<'inicio' | 'perfil' | 'explorar'>('inicio')

    return(

        <div className="flex justify-center w-full h-full overflow-hidden ">

            <Sidebar setActivePage={setActivePage}/>

            <div className="mt-12 ml-16" id="home">
                {activePage === 'inicio' ? <Inicio/> : activePage === 'perfil' ? <Profile/> : <Discover/>}
            </div>
            
            
        </div>
    )
}