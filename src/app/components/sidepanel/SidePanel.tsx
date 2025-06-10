import { BookmarkSimple, BookOpen, X } from '@phosphor-icons/react'

import { useEffect, useRef, useState } from "react"

import { CardBook } from '../CardBook';
import { SendReview } from './components/SendReview';
import { BoxLogin } from '../BoxLogin';
import { ReviewUser } from '../ReviewUser';

import { useCreateReview } from '@/hooks/useCreateReview';
import { useReviewsBook } from '@/hooks/useReviewsBook';
import { Loading } from '../Loading';

interface Review {
  id: number
  rating: number
  comment: string
  createdAt: string
  user: {
    id: string
    name: string
    avatar_url: string
  }
}
interface SidePanelProps{
    userId: string; // ID do usuário autenticado
    nameUser: string;
    userAvatar: string;

    bookId: string;
    title: string;
    author: string;
    sinopse: string;
    imgCover: string;
    rating: number;
    index: number;
    category: string[];
    pages: number;

    isAuthenticated: boolean;
    clickedExitBook: (clicked: boolean) => void;
     onReviewSuccessfullyAdded: () => void;
}


export function SidePanel({userId, userAvatar, nameUser, bookId, imgCover, title, author, sinopse, rating, index, category, pages, isAuthenticated,  clickedExitBook, onReviewSuccessfullyAdded} : SidePanelProps){
    

    const [reviewButton, setReviewButton] = useState(false)
    // const [reviews, setReviews] = useState<Review[]>([])
    const [showLogin, setShowLogin] = useState(false)//Estado para mostrar o login
    const panelRef = useRef<HTMLDivElement>(null)// Criando uma referência para o painel
    
    const { mutate: createReviewMutation } = useCreateReview(() => {
        setReviewButton(false)
        onReviewSuccessfullyAdded()
    })
    const { data: reviews = [], isLoading, isError } = useReviewsBook(bookId)
     const handleNewComment = async (commentData: { avatar: string; nameUser: string; comment: string; rating: number }) => {
        const categoriesString = category.length <= 0 ? '' : category.join(', ')

        createReviewMutation({
            id: bookId,
            title,
            author,
            sinopse,
            imgCover,
            rating: commentData.rating,
            comment: commentData.comment,
            userId,
            userAvatar,
            category: categoriesString,
            pages,
        })
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return() => {
            document.body.style.overflow = ''
        }
    },[bookId]) // Para tirar a barra de rolagem do body quando componente estiver aberto

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
            clickedExitBook(false); // Fecha o painel
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickedExitBook]); // Adiciona um evento de clique fora do painel para fechá-lo

    return(
        <div className="fixed inset-0 flex bg-black bg-opacity-70 z-50">

            <div ref={panelRef} className="relative flex flex-col bg-gray-800 w-[41.25rem] py-16 px-12 ml-auto max-h-screen overflow-y-auto">

                <button className="absolute top-4 right-4" onClick={() => clickedExitBook(false)}>
                    <X className="text-gray-400 hover:text-gray-300" width={24} height={24}/>
                </button>

                <div className="flex flex-col bg-gray-700 py-6 px-8 rounded-lg gap-10">

                    <CardBook
                        title={title}
                        alt={title}
                        index={index}
                        author={author}
                        imgBook={imgCover}
                        rating={rating}
                        widthAvatar={172}
                        heightAvatar={242}
                        blockedClick
                        sizeStar={20}
                        styleH2='text-gray-100 text-2xl'
                        styleH3='text-gray-400 text-base'
                        category={category}
                        pages={pages}
                    />
                   
                    <div className="flex gap-[3.75rem] border-t-[1px] border-gray-600 py-6"> 

                        <div className="flex gap-4 items-center">
                            <BookmarkSimple className="text-green-100" size={24}/>

                            <div className='w-56'>
                                <span className="text-sm text-gray-300">Categoria</span>
                                <h2 className="text-gray-200 text-base line-clamp-2">{category?.length ? category.join(', ') : ''}</h2>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <BookOpen className="text-green-100" size={24}/>

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-300">Páginas</span>
                                <h2 className="text-gray-200 text-base">{pages || 'N/A'}</h2>
                            </div>
                        </div>
                    </div>

                </div>{/*Card Book*/}

                <div className="flex flex-col mt-10 gap-4  ">

                    <div className="flex justify-between items-center">

                        <h2 className="text-sm text-gray-200">Avaliações</h2>

                        {!reviewButton && 
                            <button 
                                onClick={() => {
                                    if(!isAuthenticated){
                                        setShowLogin(true)
                                        
                                    }else{
                                        setReviewButton(true)
                                       
                                    }
                                 } }

                                className="text-base text-purple-100 hover:text-purple-hoover hover:bg-purple-100 hover:bg-opacity-10 p-1 rounded">
                                Avaliar
                            </button>
                        }
                        
                    </div>

                    {showLogin &&
                        <BoxLogin
                            setCloseLogin={setShowLogin}
                        />
                    }{/*Mostra tela de login se tentar avaliar sem estar logado*/}
                   
                    {reviewButton && 
                        <SendReview
                            imgAvatar={userAvatar}
                            nameUser={nameUser}
                            rating={0}
                            sizeStarRating={24}
                            setCloseReview={setReviewButton}
                            key={title}
                            handleNewComment={handleNewComment}
                        />
                    }{/*Deixar Avalição*/ }
                    
                    
                    { isLoading ? 
                        <div className='flex justify-center items-center mt-10'>
                            <Loading/>
                        </div>
                        
                        :
                        reviews.map((review : Review) => (
                            <div className="bg-gray-700 p-5 rounded-lg w-full" id="reviews" key={review.id}>
                                <ReviewUser
                                    imgProfile={review.user.avatar_url}
                                    nameUser={review.user.name}
                                    dateReview={review.createdAt}
                                    sizeImageUser="2.5rem"
                                    rating={review.rating}
                                    comment={review.comment}
                                />
                        </div>
                        ))
                    }{/*Lista de avaliações*/}

                </div>
            </div>
        </div>
    )
}