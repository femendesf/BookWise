import { convertDateRead } from "@/utils/convertDateRead";
import { PhotoProfile } from "./PhotoProfile";
import { StarRating } from "./StarRating";


interface Reviews{
    imgProfile: string;
    sizeImageUser?: string;
    nameUser: string;
    dateReview?: string;
    rating?: number;
    sizeStarRating?: number;
    comment?:  string;
  
    
}

export function ReviewUser({imgProfile, sizeImageUser, nameUser, dateReview, rating, comment, sizeStarRating } : Reviews){

    const formattedDate = convertDateRead(dateReview || new Date().toISOString());
    if(!rating){
        rating = 0
    }

    if(!sizeImageUser){
        sizeImageUser = '2.5rem'
    }

    return(
        <div className='flex flex-col w-full h-full gap-5'>

            <div className="flex items-center justify-between">

                <div className='flex gap-4 items-center'>
                    <PhotoProfile imageUrl={imgProfile} size={sizeImageUser}  />
                    <div>
                        <h2 className="truncate max-w-44">{nameUser.split(' ').slice(0, 3).join(' ')}</h2>
                        <span className="text-gray-400 text-sm">{formattedDate}</span>
                    </div>
                </div>

                <StarRating rating={rating} size={sizeStarRating}/>
            </div>

            {comment && <p className="text-gray-300 text-sm">{comment}</p>}

        </div>
    )
}