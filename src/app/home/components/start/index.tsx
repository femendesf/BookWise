'use client'
import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { LastReading } from "./components/LastReading";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { MotionCard } from "@/utils/motionDiv";

import { listBooks } from "@/utils/listBooks";
import { PopularBooks } from "../../../components/PopularBooks";
import { lastBookReading } from "@/utils/lastBookReading";
import { useState } from "react";

interface StartProps{
    loggedIn: boolean;
    setButtonSeeAll: (page: 'inicio' | 'perfil' | 'explorar') => void
    setSelectedBook: (book: any) => void;
}


export function Start({loggedIn, setButtonSeeAll, setSelectedBook} : StartProps){

    const [loggedPopularBooks, setLoggedPopularBooks] = useState(false)

    return(

        <motion.div
            {...fadeIn}
        >
            <div id="start" className="flex justify-between">

                <div className="flex flex-col gap-10 mb-1 w-[48.75rem] xxl:w-[51.25rem]">

                    <h1 className="flex gap-3">
                        <ChartLineUp size={32} className="text-green-100"/>
                        Início
                    </h1>
            
                    {loggedIn && <LastReading />}

                    <div>
                        <span className="text-gray-100 text-sm">Avaliações mais recentes</span>

                        {lastBookReading.map(({user, title, rating, cover, author, id, description}) => (

                            <RecentReviews 
                                title={title}
                                author={author}
                                imgBook={cover}
                                imgProfile={user.avatarUser}
                                name={user.idUser}
                                when={user.dateReading}
                                rating={rating}
                                description={description}
                                index={id}
                                key={id}
                            />

                        ))}

                    </div>

                </div>
                
                <div className="flex flex-col gap-4 w-96 ml-16 xxl:20 overflow-hidden">

                    <div className="flex justify-between text-sm">
                        <span className="text-gray-100">Livros populares</span>

                        <button 
                            className="text-purple-100 hover:text-purple-hoover"
                            onClick={() => setButtonSeeAll('explorar')}
                        >
                            Ver todos
                        </button>

                    </div>
                    
                    {listBooks.slice(0, 4).map((book, index) => (
                        
                        
                        <motion.div 
                            variants={MotionCard}
                            initial="hidden"
                            animate="visible"
                            custom={index} 
                            className="h-36 "
                            key={book.id}
                            onClick={() => setSelectedBook({
                                ...book,
                                description:{
                                    category: book.description.category || [],
                                    pages: book.description.pages || 0,
                                }
                            })}>
                            
                            <PopularBooks
                                key={book.id}
                                imgBook={book.cover}
                                alt={`Capa livro ${book.title}`}
                                title={book.title}
                                author={book.author}
                                rating={book.rating}
                                index={index}
                                widthAvatar={64}
                                heightAvatar={94}
                                sizeStar={16}
                                category={book.description.category}
                                pages={book.description.pages}
                            />

                            
                        </motion.div>
                    
                    ))}

                </div>
            </div>
        </motion.div>
    )

}