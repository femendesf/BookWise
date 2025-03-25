import { PhotoProfile } from "./PhotoProfile";
import { StarRating } from "./StarRating";


interface Reviews{
    imgProfile: string;
    sizeImageUser?: string;
    nameUser: string;
    when?: string;
    rating?: number;
    sizeStarRating?: number;
    comment?:  string;
    userRating?: boolean;
    quantityStarsRating?: (quantity: number | null) => void;
    
}

export function ReviewUser({imgProfile, sizeImageUser, nameUser, when, rating, comment, sizeStarRating, userRating, quantityStarsRating} : Reviews){

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
                        <h3>{when}</h3>
                    </div>
                </div>

                <StarRating rating={rating} size={sizeStarRating}/>
            </div>

            {comment && <p className="text-gray-300 text-sm">{comment}</p>}

        </div>
    )
}