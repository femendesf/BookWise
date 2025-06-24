import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { LastReading } from "./components/LastReading";
import { CardBook } from "../../../../components/CardBook";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { MotionCard } from "@/utils/motionDiv";

import { useBookStore } from "@/store/BookStore";
import { useRecentReviews } from "@/hooks/useRecentReviews";
import { Loading } from "@/app/components/Loading";
interface Review {
  comment: string; // O comentário da avaliação
  rating: number; // O rating da avaliação
  createdAt: string; // Data de criação da avaliação (vem como string do Prisma)
  user: {
    name: string; // Nome do usuário
    avatarUrl: string; // URL do avatar do usuário
  };
  book: {
    book_id: string; // ID do Google Books
    title: string;
    author: string;
    coverUrl: string; // URL da capa do livro
    category: string; // Categoria do livro
    synopsis: string;
    // Não inclua synopsis aqui, pois a review não a possui diretamente.
    // Se RecentReviews precisar da synopsis, você precisaria de outro fetch ou passar setSelectedBook com os dados do livro completo.
  };
}

interface StartProps{
    loggedIn: boolean;
    hasBookRead: boolean;
    setButtonSeeAll: (page: 'inicio' | 'perfil' | 'explorar') => void;
    setSelectedBook: (book: any) => void;
}

export function Start({loggedIn, hasBookRead, setButtonSeeAll, setSelectedBook, } : StartProps){

    const { booksByGenre } = useBookStore();
    
    const popularBooks = booksByGenre['Tudo'] || []; // Livros populares

    const {data: recentReviews, isLoading} = useRecentReviews()
    
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
            
                    <div className="flex gap-16 h-full">

                        <div className="flex gap-10 flex-col w-[48rem] xxl:w-[51.25rem] mb-10">

                            {loggedIn && hasBookRead && <LastReading setButtonSeeAll={setButtonSeeAll}/>}
                            
                            <div className="flex flex-col gap-3">
                                <span className="text-gray-100 text-sm">Avaliações mais recentes</span>

                            {isLoading ? (

                                <div className="flex items-center justify-center w-full h-full mt-52">
                                    <Loading/>
                                </div>

                                ) : Array.isArray(recentReviews) && recentReviews.length > 0 ? (
                                    <div className="flex flex-col gap-3">
                                        {recentReviews.map((review: Review, index: any) => {
                                            const { rating, createdAt, user, book } = review;

                                            return (
                                                <div key={index}>
                                                <RecentReviews 
                                                    title={book.title}
                                                    author={book.author}
                                                    imgBook={book.coverUrl}
                                                    imgProfile={user.avatarUrl}
                                                    name={user.name}
                                                    dateReview={createdAt}
                                                    rating={rating}
                                                    synopsis={book.synopsis}
                                                    index={index}
                                                />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full mt-52">
                                        <p className="text-purple-100 font-bold text-xl">Nenhuma avaliação recente disponível!</p>
                                    </div>
                                )
                            }
                            </div> 

                        </div>{/* Recent Reviews */}

                        <div className="flex flex-col gap-3 w-[28.75rem] h-full overflow-hidden">

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
                                            widthAvatar={84}
                                            heightAvatar={120}
                                            sizeStar={20}
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