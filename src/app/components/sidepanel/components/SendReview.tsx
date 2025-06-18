import { Check, X } from "@phosphor-icons/react";
import { TextAreaWithCounter } from "./TextAreaWithCounter";
import { useState } from "react";
import { PhotoProfile } from "../../PhotoProfile";
import { StarRating } from "../../StarRating";


interface SendCommentProps{
    imgAvatar: string;
    nameUser: string;
    rating: number;
    sizeStarRating: number;
    setCloseReview: (close: boolean) => void;
    handleNewComment: (commentData: {avatar: string, nameUser: string, comment: string, rating: number}) => void;
}   


export function SendReview({imgAvatar, nameUser, setCloseReview, handleNewComment} : SendCommentProps){

    const [sendCommentIsAvailable, setSendCommentIsAvailable] = useState(false)// Verifica se o botão de enviar está disponível

    const [commentText, setCommentText] = useState('')// Texto do comentário

    const [quantityStarsRating, setQuantityStarsRating] = useState<number | null >(null)
    
    function handleSendComment(){
        console.log(`COMPONENTE SendReview: ${quantityStarsRating}`)
        if(sendCommentIsAvailable && commentText.trim() !== ''){

            if(quantityStarsRating){

                const newComment = {
                avatar: imgAvatar,
                rating: quantityStarsRating,
                nameUser: nameUser,
                comment: commentText
                }
                handleNewComment(newComment)
                setCloseReview(false)
            }else{
               alert('Você precisa avaliar o livro')
            }
        }
    } // Função para enviar o comentário
    

    console.log(`COMPONENTE SendReview: ${sendCommentIsAvailable}`)

    return(
        <div className='flex flex-col  bg-gray-700 p-5 rounded-lg w-full gap-6'>

            <div className="flex justify-between items-center">

                 <div className="flex items-center justify-center gap-4">
                    <PhotoProfile imageUrl={imgAvatar} size="2.5rem"/>
                    <h2 className="truncate max-w-44 text-base text-gray-100">{nameUser.split(' ').slice(0, 3).join(' ')}</h2>
                </div>
                
                <div>
                    <StarRating rating={0} setQuantityStarsRating={setQuantityStarsRating} size={28} userRating/>
                </div>
            </div>
     
            <div className='flex flex-col gap-3'>
                <TextAreaWithCounter setSendComment={setSendCommentIsAvailable} setTextComment={setCommentText}/>

                <div className='flex gap-2 text-2xl items-center justify-end '>

                    <button className='flex text-purple-100 w-10 h-10 bg-gray-600 justify-center items-center hover:bg-gray-500
                    '
                    onClick={() => setCloseReview(false)}>
                        <X/>
                    </button>

                    <button 
                        className={`flex text-green-100 bg-gray-600 w-10 h-10 justify-center items-center ${!sendCommentIsAvailable ? `cursor-not-allowed opacity-50` : `hover:bg-gray-500 `}`}
                        onClick={handleSendComment}
                    >
                        <Check/>
                    </button>

                    
                </div>
            </div>
        </div>
    )
    
}