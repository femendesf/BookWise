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
import { useReviewsUser } from "@/hooks/useReviewsUser";

type ProfileProps = {
    session: Session | null,
    
}

type Book = {
  id: string;
  title: string;
  author: string | string[];
  cover: string;
  rating: number;
  description: string;
  dateLastReading: string;
};


export function Profile({session} : ProfileProps) {

    const { data: sessionData } = useSession();
    const avatar_url = session?.user?.avatar_url || sessionData?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || sessionData?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados

    const [textSearch, setTextSearch] = useState('')
    const [visibleBooks, setVisibleBooks] = useState(3);
    const [ quantityReviews, setQuantityReviews ] = useState(0)
  
    const {
        createdAt,
        bookItems,
        totPagesRead,
        uniqueAuthors,
        categoryMoreRead,
        hasFetched
    } = useProfileStore()

    const { data :  reviews} = useReviewsUser()

    console.log('Data from useReviewsUser:', reviews)
    
    useEffect(() => {
        
        if(reviews){
            setQuantityReviews(reviews)
        }
    } , [reviews])

    function handleTextSearch(){
        setTextSearch('')
    }

    const resultSearch = bookItems.filter(
        (book : Book )=>
                (book.title && typeof book.title === "string" && book.title.toLowerCase().includes(textSearch.toLowerCase())) ||
                (book.author &&
                    (typeof book.author === "string"
                        ? book.author.toLowerCase().includes(textSearch.toLowerCase())
                        : Array.isArray(book.author) && book.author.some((a : any) => a.toLowerCase().includes(textSearch.toLowerCase()))
                    )
                )
    );
    
    const year = createdAt ?? "----"; // fallback para string segura
    
    const renderBooks = (books: Book[]) => (
        books.map(({ id, title, author, cover, rating, description, dateLastReading }) => (
            <motion.div {...fadeIn} key={id}>
                <MyBooks
                title={title}
                author={typeof author === "string" ? [author] : author}
                img={cover}
                rating={rating}
                description={description}
                dateLastReading={dateLastReading}
                />
            </motion.div>
        ))
    );
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
                    {renderBooks(bookItems.slice(0, visibleBooks))}

                    {bookItems.length > visibleBooks && (
                    <button
                        className="flex items-center justify-center w-full h-12 mt-10 text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500"
                        onClick={() => setVisibleBooks(visibleBooks + 3)}
                    >
                        Ver mais
                    </button>
                    )}
                </div>
                :
                <div>
                    {renderBooks(resultSearch)}
                </div>
            }
            </div>

            <MyProfile name={name} avatar_url={avatar_url} reviewedBooks={quantityReviews} totPagesRead={totPagesRead} totAuthorsRead={uniqueAuthors!.length} categoryMoreRead={categoryMoreRead} createdAt={year}/>
        </div>
    )
}