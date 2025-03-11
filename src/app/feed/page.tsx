'use client'

import { useState } from "react"
import { Start } from "./components/start"
import { Profile } from "./components/profile"
import { Sidebar } from "../components/Sidebar"
import { Discover } from "./components/discover"

import { SidePanel } from "../components/sidepanel/SidePanel"

import { useIsAuthenticated  } from '@/utils/isAuthenticated';
import { BoxLogin } from "../components/BoxLogin"

export default function Feed() {

    const [showLogin, setShowLogin] = useState(false)//Estado para mostrar o login
    const [activePage, setActivePage] = useState<'inicio' | 'perfil' | 'explorar'>('inicio') //Para mostrar os componentes na tela conforme esta clicado no Sidebar

    const [selectedBook, setSelectedBook] = useState<{
        id: number;
        title: string;
        author: string;
        imgBook: string;
        rating: number;
        description: {
            category: string[];
            pages: number;
        };
       
        cover?: string;
    } | null>(null);

    const isAuthenticated = useIsAuthenticated();

    function handleChangeComponent(page: 'inicio' | 'perfil' | 'explorar') {
        setActivePage(page);
    }// Função para mudar o componente na tela

    // function handleNewComment(commentData: {avatar: string, nameUser: string, comment: string}){
    //     setComments((prevComments) => [...prevComments, commentData]);
    // } // Adiciona um novo comentário

    console.log(isAuthenticated)
    return(

        <div className="flex w-full h-full">

            <Sidebar 
                activePage={activePage}
                setActivePage={handleChangeComponent}
                setClickedButtonLogin={setShowLogin}
            />
        
            <div className="mt-12 ml-16 xxl:ml-24" id="home">
                {activePage === 'inicio' ? <Start setButtonSeeAll={handleChangeComponent} loggedIn={isAuthenticated} setSelectedBook={setSelectedBook}/> : activePage === 'perfil' ? <Profile/> : <Discover setSelectedBook={setSelectedBook}/>}
            </div>

            {showLogin && 
                <BoxLogin
                   
                    setCloseLogin={setShowLogin}
                /> 
            }{/*Mostra a tela de login se tiver clicado no botão de fazer login */}
            
            
            
                {selectedBook && 
                
                    <SidePanel
                        title={selectedBook.title}
                        author={selectedBook.author}
                        imgCover={selectedBook.cover || ''}
                        rating={selectedBook.rating}
                        index={selectedBook.id}
                        category={selectedBook.description.category}
                        pages={selectedBook.description.pages}
                        clickedExitBook={() => setSelectedBook(null)}
                    />
                }
        </div>
    )
}