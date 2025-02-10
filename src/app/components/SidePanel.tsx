import { BookmarkSimple, BookOpen, X } from '@phosphor-icons/react'
import { ReviewUser } from "./ReviewUser"

import Avatar from '../../public/assets/rick.jpg'
import { useEffect, useRef, useState } from "react"
import { PopularBooks } from "./PopularBooks"

import { listComments as initialComments } from '@/utils/listComments'
import { SendReview } from './SendReview'

interface SidePanelProps{
    title: string;
    author: string;
    imgCover: string;
    rating: number;
    index: number;
    clickedExitBook: (clicked: boolean) => void;
}


export function SidePanel({imgCover, title, author, rating, index, clickedExitBook} : SidePanelProps){

    console.log(clickedExitBook)
    const [reviewButton, setReviewButton] = useState(false)
    // const [sendComment, setSendComment] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)// Criando uma referência para o painel
    const [ comments, setComments] = useState(initialComments)

    function handleNewComment(commentData: {avatar: string, nameUser: string, comment: string, rating: number }){
        setComments((prevComments) => [...prevComments, commentData]);
    } // Adiciona um novo comentário

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return() => {
            document.body.style.overflow = ''
        }
    },[]) // Para tirar a barra de rolagem do body quando componente estiver aberto

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
                    
                    <PopularBooks 
                        title={title}
                        alt={title}
                        index={index}
                        author={author}
                        imgBook={imgCover}
                        rating={rating}
                        width={172}
                        height={242}
                        blockedClick
                        sizeStar={20}
                    />

                    <div className="flex gap-[3.75rem] border-t-[1px] border-gray-600 py-6"> 

                        <div className="flex gap-4 items-center">
                            <BookmarkSimple className="text-green-100" size={24}/>

                            <div>
                                <span className="text-sm text-gray-300">Categoria</span>
                                <h2 className="text-gray-200 text-base">Computação, educação</h2>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <BookOpen className="text-green-100" size={24}/>

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-300">Páginas</span>
                                <h2 className="text-gray-200 text-base">160</h2>
                            </div>
                            
                        </div>
                    </div>
                </div>{/*Card Book*/}

                <div className="flex flex-col mt-10 gap-4">

                    <div className="flex justify-between">
                        <h2 className="text-sm text-gray-200">Avaliações</h2>

                        {!reviewButton && <button onClick={() => setReviewButton(true)} className="text-base text-purple-100">Avaliar</button>}
                        
                    </div>
                   
                    {reviewButton && 
                        <SendReview
                            imgAvatar={Avatar.src}
                            nameUser='Felipe Mendes'
                            rating={0}
                            sizeStarRating={24}
                            setCloseReview={setReviewButton}
                            key={title}
                            handleNewComment={handleNewComment}
                        />
                    } {/*Deixar Avalição*/ }
                   
                    
                    {[...comments].reverse().map((user, key) => (
                        <div className="bg-gray-700 p-5 rounded-lg w-full" id="reviews" key={key}>
                        
                            <ReviewUser 
                                imgProfile={user.avatar}
                                nameUser={user.nameUser}
                                when="Hoje"
                                sizeImageUser="2.5rem"
                                rating={user.rating}
                                comment={user.comment}
                            />
                        </div>
                    ))}{/*Comentarios*/ }
                   
                </div>
            </div>
        </div>
        
    )
}