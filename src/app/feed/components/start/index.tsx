import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { LastReading } from "./components/LastReading";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { MotionCard } from "@/utils/motionDiv";

import { CardBook } from "../../../components/CardBook";
import { lastBookReading } from "@/utils/lastBookReading";
import { useBookStore } from "@/store/BookStore";

interface StartProps{
    loggedIn: boolean;
    setButtonSeeAll: (page: 'inicio' | 'perfil' | 'explorar') => void
    setSelectedBook: (book: any) => void;
}

export function Start({loggedIn, setButtonSeeAll, setSelectedBook} : StartProps){

    const { booksByGenre } = useBookStore();
    
    const popularBooks = booksByGenre['Tudo'] || []; // Livros populares
    
    return(

        <motion.div
            {...fadeIn}
        >
            <div id="start" className="flex items-center">

                <div className="flex flex-col gap-10 w-full">

                    <h1 className="flex gap-3 text-gray-100">
                        <ChartLineUp size={32} className="text-green-100"/>
                        Início
                    </h1>
            
                    <div className="flex gap-16">

                        <div className="flex gap-10 flex-col w-[48rem] xxl:w-[51.25rem] mb-10">

                            {loggedIn && <LastReading setButtonSeeAll={setButtonSeeAll}/>}
                            
                            <div className="flex flex-col gap-3">
                                <span className="text-gray-100 text-sm">Avaliações mais recentes</span>

                                <div className="flex flex-col gap-3">
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

                        </div>{/* Recent Reviews */}

                        <div className="flex flex-col gap-3 w-96 overflow-hidden">

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-100">Livros populares</span>

                                <button 
                                    className="text-purple-100 hover:text-purple-hoover hover:bg-purple-100 hover:bg-opacity-10 p-1 rounded"
                                    onClick={() => setButtonSeeAll('explorar')}
                                >
                                    Ver todos
                                </button>

                            </div>
                            
                            <div className="flex flex-col gap-4">
                                {popularBooks.slice(0, 4).map((book, index) => (
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
                                        
                                        <CardBook
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
                           
                        </div> {/* Popular Books */}
                        
                    </div>
                </div>
            </div>
        </motion.div>
    )
}