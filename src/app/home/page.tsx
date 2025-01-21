'use client'

import { Inicio } from "../components/inicio"
import { Sidebar } from "../components/Sidebar"


export default function Home() {

    const logado = true
    return(

        <div className="flex justify-center w-full h-full overflow-hidden">

            <Sidebar />

            <div className="mt-12 ml-16">
                <Inicio />
            </div>
            
            
        </div>
    )
}

//style={{ backgroundImage: `url(${Background.src})` }}