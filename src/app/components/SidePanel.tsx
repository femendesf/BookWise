import { BookmarkSimple, BookOpen, Check, X } from '@phosphor-icons/react'
import { PhotoProfile } from "./PhotoProfile"
import { StarRating } from "./StarRating"
import { ReviewUser } from "./ReviewUser"

import Avatar from '../../public/assets/rick.jpg'
import { useEffect, useState } from "react"
import { PopularBooks } from "./PopularBooks"
import { TextAreaWithCounter } from './TextAreaWithCounter'

import { listComments } from '@/utils/listComments'
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
    const [sendComment, setSendComment] = useState(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return() => {
            document.body.style.overflow = ''
        }
    },[]) // Para tirar a barra de rolagem do body quando componente estiver aberto


    return(
        <div className="fixed inset-0 flex bg-black bg-opacity-70">

            <div className="relative flex flex-col bg-gray-800 w-[41.25rem] py-16 px-12 ml-auto max-h-screen overflow-y-auto">

                <button className="absolute top-4 right-4" onClick={() => clickedExitBook(false)}>
                    <X className="text-gray-400 hover:text-gray-300" width={24} height={24}/>
                </button>

                <div className="flex flex-col bg-gray-700 py-6 px-8 rounded-lg gap-10">
                    
                    <PopularBooks 
                        title={title}
                        alt={title}
                        author={author}
                        imgBook={imgCover}
                        index={index}
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
                            key={index}
                        />
                    } {/*Deixar Avalição*/ }
                   
                    
                    {listComments.map(({avatar, nameUser, comment}) => (
                        <div className="bg-gray-700 p-5 rounded-lg w-full" id="reviews" key={nameUser}>
                        
                            <ReviewUser 
                                imgProfile={avatar}
                                nameUser={nameUser}
                                when="Hoje"
                                sizeImageUser="2.5rem"
                                rating={4}
                                comment={comment}
                            />
                        </div>
                    ))}{/*Comentarios*/ }
                   
                </div>
            </div>
        </div>
        
    )
}