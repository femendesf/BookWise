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

import { useProfileStore } from "@/store/profileStore";

type ProfileProps = {session: Session | null}

export function Profile({session} : ProfileProps) {

    const { data: sessionData } = useSession();
    const avatar_url = session?.user?.avatar_url || sessionData?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || sessionData?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados

    const [textSearch, setTextSearch] = useState('')
    const [visibleBooks, setVisibleBooks] = useState(3);
  
    const {
        createdAt,
        bookItems,
        totPagesRead,
        uniqueAuthors,
        categoryMoreRead,
        reviews,
        hasFetched
    } = useProfileStore()

    useEffect(() => {console.log('VALOR DE HASFETCHED' , hasFetched)}, [hasFetched])
    function handleTextSearch(){
        setTextSearch('')
    }
   
    const resultSearch = bookItems.filter(
        book =>
                (book.title && typeof book.title === "string" && book.title.toLowerCase().includes(textSearch.toLowerCase())) ||
                (book.author &&
                    (typeof book.author === "string"
                        ? book.author.toLowerCase().includes(textSearch.toLowerCase())
                        : Array.isArray(book.author) && book.author.some((a : any) => a.toLowerCase().includes(textSearch.toLowerCase()))
                    )
                )
    );
    
    const year = createdAt! // Garante que o ano seja sempre uma string
   
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
                    <div className="mb-24">
                        {bookItems.slice(0, visibleBooks).map(({title, author, cover, rating, description, dateLastReading}, index) => (
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
                                    
                                    
                                />
                            </motion.div>
                            
                        ))}

                        {bookItems.length > visibleBooks &&  <button
                            className="flex items-center justify-center w-full h-12 mt-10 text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500"
                            onClick={() => setVisibleBooks(visibleBooks + 3)}
                        >
                            Ver mais
                        </button>}
                        
                    </div>

                    :
                    <div>
                        {resultSearch.map(({title, author, cover, rating, description, dateLastReading}, index) => {
                            return(
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
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                }
            </div>

            <MyProfile name={name} avatar_url={avatar_url} reviewedBooks={reviews} totPagesRead={totPagesRead} totAuthorsRead={uniqueAuthors!.length} categoryMoreRead={categoryMoreRead} createdAt={year}/>
        </div>
    )
}