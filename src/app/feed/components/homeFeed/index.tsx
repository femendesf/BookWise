'use client'

import { useState } from "react"
import { useIsAuthenticated  } from '@/utils/isAuthenticated';

import { Start } from "../start";
import { Profile } from "../profile";
import { Discover } from "../discover";

import { BoxLogin } from "@/app/components/BoxLogin";

import { Sidebar } from "@/app/components/sidebar/Sidebar";
import { SidePanel } from "@/app/components/sidepanel/SidePanel";
import { Session } from "next-auth";

type SessionFeed ={session: Session | null}

export function Feed({session}: SessionFeed) {

    const isAuthenticated = useIsAuthenticated();
    const avatar_url = session?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados

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

    function handleChangeComponent(page: 'inicio' | 'perfil' | 'explorar') {
        setActivePage(page);
    }// Função para mudar o componente na tela

    // function handleNewComment(commentData: {avatar: string, nameUser: string, comment: string}){
    //     setComments((prevComments) => [...prevComments, commentData]);
    // } // Adiciona um novo comentário

    return(

        <div className="flex w-full h-full">

            <Sidebar
                activePage={activePage}
                setActivePage={handleChangeComponent}
                setClickedButtonLogin={setShowLogin}
                avatar_url={avatar_url}
                name={name}
                isAuthenticated={isAuthenticated}
            />
        
            <div className="mt-12 ml-16 xxl:ml-24" id="home">
                {activePage === 'inicio' ? <Start setButtonSeeAll={handleChangeComponent} loggedIn={isAuthenticated} setSelectedBook={setSelectedBook}/> : activePage === 'perfil' ? <Profile avatar_url={avatar_url} name={name}/> : <Discover setSelectedBook={setSelectedBook}/>}
            </div>

            {showLogin && 
                <BoxLogin
                   
                    setCloseLogin={setShowLogin}
                /> 
            }{/*Mostra a tela de login se tiver clicado no botão de fazer login */}
            
            
                {selectedBook && 
                
                    <SidePanel
                        nameUser={name}
                        imgAvatar={avatar_url}
                        title={selectedBook.title}
                        author={selectedBook.author}
                        imgCover={selectedBook.cover || ''}
                        rating={selectedBook.rating}
                        index={selectedBook.id}
                        category={selectedBook.description.category}
                        pages={selectedBook.description.pages}
                        isAuthenticated={isAuthenticated}
                        clickedExitBook={() => setSelectedBook(null)}

                    />
                }
        </div>
    )
}