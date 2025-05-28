'use client'

import { useEffect, useState } from "react"
import { useIsAuthenticated  } from '@/utils/isAuthenticated';

import { Start } from "../start";
import { Profile } from "../profile";
import { Discover } from "../discover";

import { BoxLogin } from "@/app/components/BoxLogin";

import { Sidebar } from "@/app/components/sidebar/Sidebar";
import { SidePanel } from "@/app/components/sidepanel/SidePanel";
import { Session } from "next-auth";
import { useProfileStore } from "@/store/profileStore";
import axios from "axios";
import dayjs from "dayjs";
import { categoryTranslations } from "@/utils/categoriesTranslated";

import { DotStream } from 'ldrs/react'
import 'ldrs/react/DotStream.css'

import { useBookStore } from "@/store/BookStore";

type SessionFeed ={session: Session | null}

export function Feed({session}: SessionFeed) {

    const isAuthenticated = useIsAuthenticated();
    const avatar_url = session?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados
    const [hasBookRead, setHasBookRead] = useState(false); // Estado para verificar se o usuário tem livros lidos
    const [showLogin, setShowLogin] = useState(false)//Estado para mostrar o login
    const [activePage, setActivePage] = useState<'inicio' | 'perfil' | 'explorar'>('inicio') //Para mostrar os componentes na tela conforme esta clicado no Sidebar

    const { setBooksForGenre, booksByGenre } = useBookStore();

    console.log("booksByGenre", booksByGenre)

    
    const [selectedBook, setSelectedBook] = useState<{
        id: number;
        title: string;
        author: string;
        sinopse: string; // Adicionando sinopse obrigatória
        cover: string;
        rating: number;
        description: {
            category: string[];
            pages: number;
        };
    
        
    } | null>(null);

    const { setProfileData, setHasFetched, hasFetched } = useProfileStore()
    const [isLoading, setIsLoading] = useState(true);
    function handleChangeComponent(page: 'inicio' | 'perfil' | 'explorar') {
        setActivePage(page);
    }// Função para mudar o componente na tela

    useEffect(() => { 

        if(!session){
          setIsLoading(false)
          return
        }
       
        const fetchUserData = async () => {
            try {
              const [createdAtRes, bookReadRes] = await Promise.all([
                  axios.get('/api/user/created_at'),
                  axios.get('/api/user/booksRead')
              ]);
              
              console.log("createdAtRes", createdAtRes)
              const createdAt = dayjs(createdAtRes.data.user.created_at).year().toString(); // Converte a data para o formato Date
              const books = bookReadRes.data.books || [];

              if (books.length === 0) {
                setHasBookRead(false);
                return;
              }
              
              setHasBookRead(true)
              let totPages = 0;
              const authorsSet = new Set<string>(); // ← Cria um Set para armazenar autores únicos
              const categoryCount: Record<string, number> = {} // ← Cria um objeto para armazenar contagens de categorias

              books.forEach((book: any) => {
                totPages += book.pages || 0;
        
                if (Array.isArray(book.author)) {
                  book.author.forEach((a: string) => authorsSet.add(a));
                }
        
                if (Array.isArray(book.categories)) {
                  book.categories.forEach((category: string) => {
                    const matchedKey = Object.keys(categoryTranslations).find(key =>
                      category.toLowerCase().includes(key.toLowerCase())
                    );
                    const translated = matchedKey ? categoryTranslations[matchedKey] : category;
                    categoryCount[translated] = (categoryCount[translated] || 0) + 1;
                  });
                }
              });
              
              const mostReadCategory = Object.entries(categoryCount).reduce(
                (a, b) => (b[1] > a[1] ? b : a), ["", 0]
              )[0];
                // Atualiza o estado com o número de autores lidos
              
                setProfileData({
                createdAt,
                bookItems: books,
                totPagesRead: totPages,
                uniqueAuthors: Array.from(authorsSet),
                categoryMoreRead: mostReadCategory
              });

              setHasFetched(true); // Marca como já buscado
            } catch (error) {
              console.error("Erro ao buscar data de criação do usuário", error);
            }finally{
                setIsLoading(false); // Define o loading como false após a busca
            }
        }; 
      
        fetchUserData();
    }, [hasFetched, setProfileData, setHasFetched]) // Chama a função para buscar os dados do usuário, como livros lidos, informações do perfil, etc.

    useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`/api/books?q=&subject=`);
        const data = response.data;

        if (!data.error) {
          setBooksForGenre('Tudo', data);  // salva no store
        }
      } catch (error) {
        console.error("Erro ao buscar livros gerais:", error);
      }
    };

    fetchAllBooks();
    }, []); // Chama a função para buscar todos os livros

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
            {isLoading ?
              <div className="flex items-center justify-center w-full h-full mt-96">
                    <DotStream
                        size="60"
                        speed="2.5"
                        color="#8381D9" 
                    />
              </div>

              :

              <div className="mt-12 ml-16 xxl:ml-24 w-full" id="home">
                {activePage === 'inicio' ? <Start setButtonSeeAll={handleChangeComponent} loggedIn={isAuthenticated} hasBookRead={hasBookRead} setSelectedBook={setSelectedBook}/> : activePage === 'perfil' ? <Profile session={session}/> : <Discover setSelectedBook={setSelectedBook}/>}
              </div>
            }
            
            {showLogin && 
                <BoxLogin
                   
                    setCloseLogin={setShowLogin}
                /> 
            }{/*Mostra a tela de login se tiver clicado no botão de fazer login */}
            
            
                {selectedBook && 
                
                    <SidePanel
                        userId={session?.user?.id || ''}
                        nameUser={name}
                        userAvatar={avatar_url}
                        title={selectedBook.title}
                        author={selectedBook.author}
                        sinopse={selectedBook.sinopse}
                        imgCover={selectedBook.cover || ''}
                        rating={selectedBook.rating}
                        index={selectedBook.id}
                        category={selectedBook.description.category}
                        pages={selectedBook.description.pages}
                        isAuthenticated={isAuthenticated}
                        clickedExitBook={() => setSelectedBook(null)}
                        bookId={selectedBook.id.toString() || ''}

                    />
                }
        </div>
    )
}