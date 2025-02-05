import { Check, X } from "@phosphor-icons/react";
import { TextAreaWithCounter } from "./TextAreaWithCounter";
import { ReviewUser } from "./ReviewUser";
import { useState } from "react";

interface SendCommentProps{
    imgAvatar: string;
    nameUser: string;
    rating: number;
    sizeStarRating: number;
    setCloseReview: (close: boolean) => void;
}

export function SendReview({imgAvatar, nameUser, rating, sizeStarRating, setCloseReview} : SendCommentProps){

    const [sendComment, setSendComment] = useState(false)
    
    console.log(`COMPONENTE SendReview: ${sendComment}`)

    return(
        <div className='flex flex-col  bg-gray-700 p-5 rounded-lg w-full gap-6'>

            <div>
                <ReviewUser
                    imgProfile={imgAvatar}
                    nameUser={nameUser}
                    rating={rating}
                    sizeStarRating={sizeStarRating}
                    userRating
                />
            </div>
     
            <div className='flex flex-col gap-3'>
                <TextAreaWithCounter setSendComment={ setSendComment}/>

                <div className='flex gap-2 text-2xl items-center justify-end'>

                    <button className='flex text-purple-100 w-10 h-10 bg-gray-600 justify-center items-center hover:bg-gray-500
                    '
                    onClick={() => setCloseReview(false)}>
                        <X/>
                    </button>

                    <button 
                        className={`flex text-green-100 bg-gray-600 w-10 h-10 justify-center items-center ${!sendComment ? `cursor-not-allowed opacity-50` : `hover:bg-gray-500 `}`}
                        
                    >
                        <Check/>
                    </button>
                </div>
            </div>
        </div>
    )
    
}