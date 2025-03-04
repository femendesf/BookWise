'use client'

import { useEffect, useState } from "react"
import { Start } from "./components/start"
import { Profile } from "./components/profile"
import { Sidebar } from "../components/Sidebar"
import { Discover } from "./components/discover"
import { Login } from "../components/Login"
import { SidePanel } from "../components/sidepanel/SidePanel"
import { useSession } from "next-auth/react"

export default function Home() {

    const [loggedIn, setLoggedIn] = useState(false)// Verifica se o usuario esta logado

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

    const session = useSession()

   
    
    useEffect(() => {
        if(session.status === 'authenticated'){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
    } ,[session])

    useEffect(()=>{

        if(activePage === 'perfil'){
            setActivePage('inicio')
        }

    },[loggedIn]) // Atualiza a marcação do SideBar para voltando ao inicio quando o usuario esta no componente perfil e aperta para desconectar

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
                loggedIn={loggedIn}
                setClickedButtonLogin={setShowLogin}
                setExitLogin={setLoggedIn}
            />
        
            <div className="mt-12 ml-16 xxl:ml-24" id="home">
                {activePage === 'inicio' ? <Start setButtonSeeAll={handleChangeComponent} loggedIn={loggedIn} setSelectedBook={setSelectedBook}/> : activePage === 'perfil' ? <Profile/> : <Discover setSelectedBook={setSelectedBook}/>}
            </div>

            {showLogin && 
                <Login 
                    setLogin={setLoggedIn}
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
                        login={loggedIn}
                        setLogin={setLoggedIn}
                    />
                }
        </div>
    )
}