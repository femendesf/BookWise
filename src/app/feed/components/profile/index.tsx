'use client'
import { CaretLeft, User } from "@phosphor-icons/react";
import { MyBooks } from "./components/MyBooks";
import { MyProfile } from "./components/MyProfile";

import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { InputSearchBook } from "../../../components/InputSearchBook";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import axios from "axios";
import { categoryTranslations } from "@/utils/categoriesTranslated";

type ProfileProps ={session: Session | null}

export function Profile({session} : ProfileProps) {

    const { data: sessionData } = useSession();
    const avatar_url = session?.user?.avatar_url || sessionData?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || sessionData?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    
    const [bookItems, setBookItems] = useState<any[]>([]);
    const [totPagesRead, setTotPagesRead] = useState(0);
    const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([])
    const [categoryMoreRead, setCategoryMoreRead] = useState<string | null>(null);
    // const [buttonSearch, setButtonSearch] = useState(false)//Verifica se o botao de pesquisa foi clicado
    const [textSearch, setTextSearch] = useState('')
  
    const resultSearch = bookItems.filter(book => book.title.toLowerCase().includes(textSearch.toLowerCase()))

    function handleTextSearch(){
        setTextSearch('')
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const [createdAtRes, bookReadRes] = await Promise.all([
                  axios.get('/api/user/created_at'),
                  axios.get('/api/user/booksRead')
              ]);
              
              if (createdAtRes.data.createdAt) {
                setCreatedAt(new Date(createdAtRes.data.createdAt));
              }
  
              const authorsSet = new Set<string>(); // ← Cria um Set para armazenar autores únicos
              const categoryCount: Record<string, number> = {} 
              console.log("LIVROS recebidos *******************************:", bookReadRes.data.books)

              if (bookReadRes.data.books) {
                    
                    setBookItems(bookReadRes.data.books); // ← salva os livros lidos
  
                    bookReadRes.data.books.forEach((book: any) => {
                        
    
                        setTotPagesRead((prev) => prev + book.pages); // Soma as páginas lidas
                        
                        if (book.author && Array.isArray(book.author)) {
                            book.author.forEach((author: string) => {
                                authorsSet.add(author); // ← evita duplicados automaticamente
                            });// ← adiciona cada autor ao Set
                        }
    
                        if(book.categories && Array.isArray(book.categories)){
                            book.categories.forEach((category: string) => {
    
                                let matchedKey = Object.keys(categoryTranslations).find(key =>
                                    category.toLowerCase().includes(key.toLowerCase())
                                ); // Guarda o valor correspondente da chave traduzida
                                
                                if (matchedKey) {
                                    const translated = categoryTranslations[matchedKey]; 
                                    
                                    categoryCount[translated] = (categoryCount[translated] || 0) + 1; // Incrementa a contagem da categoria traduzida
                                } else {
                                    // Se não encontrar correspondência, pode salvar como está (ou ignorar se preferir)
                                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                                }
                            });
                        } // ← adiciona cada categoria ao objeto de contagem
    
                    });
    
                  setUniqueAuthors(Array.from(authorsSet)); // ← salva a lista
                  
                  // Encontra a categoria com maior contagem
                  const mostReadCategory = Object.entries(categoryCount).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0]);
                  setCategoryMoreRead(mostReadCategory[0]);
              }
  
               // Atualiza o estado com o número de autores lidos
  
            } catch (error) {
              console.error("Erro ao buscar data de criação do usuário", error);
            }
          }; 
      
          fetchUserData();
    }, [])

    const year = (createdAt?.getFullYear() || "2025").toString(); // Garante que o ano seja sempre uma string

    console.log('LIVROS:', bookItems)
    return(
        <div className="flex justify-start gap-16">

            <div className="xxl:min-w-[60rem] w-[48.75rem]">
                <motion.div
                    key={textSearch ? "clicked" : "default"}
                    {...fadeIn}
                >
                    {!textSearch ?

                        <h1 className="flex items-center gap-3 ">
                            <User className="text-green-100" size={32}/>
                            Perfil
                        </h1>
                        :
                        <button
                            className="flex items-center text-base text-gray-200 gap-3"
                            onClick={handleTextSearch}
                        >
                            <CaretLeft size={20}/>
                            Voltar
                        </button>
                    }
                </motion.div>

                <div className="h-12 mt-10 w-full">
                    {/* Search bar */}
                    <InputSearchBook
                    placeholder="Buscar livro avaliado" setTextSearch={setTextSearch} textSearch={textSearch}/>
                </div>
                
              
                {!textSearch ?
                    <div>
                        {[...bookItems].slice(0, 3).map(({title, author, cover, rating, description, dateLastReading}, index) => (
                            <motion.div
                                {...fadeIn}
                                key={index}
                            >
                                <MyBooks
                                    title={title}
                                    author={author}
                                    img={cover}
                                    rating={rating}
                                    description={description}
                                    dateLastReading={dateLastReading}
                                    index={index}
                                    
                                />
                            </motion.div>
                        ))}
                    </div>

                    :
                    <div>
                        {[...resultSearch].reverse().map(({title, author, img, rating, description, dateLastReading}, index) => {

                            return(
                                <motion.div
                                    {...fadeIn} 
                                    key={index}
                                >
                                    <MyBooks
                                        title={title}
                                        author={author}
                                        img={img}
                                        rating={rating}
                                        description={description}
                                        dateLastReading={dateLastReading}
                                        index={index}
                                       
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                }

            </div>

            <MyProfile name={name} avatar_url={avatar_url} totPagesRead={totPagesRead} totAuthorsRead={uniqueAuthors.length} categoryMoreRead={categoryMoreRead} createdAt={year}/>
        </div>
    )
}