import { PhotoProfile } from "./PhotoProfile";
import { StartRating } from "./StarRating";

interface Reviews{
    imgProfile: string;
    sizeImageUser: string;
    nameUser: string;
    when: string;
    rating: number;
    comment?:  string;
}

export function ReviewUser({imgProfile, sizeImageUser, nameUser, when, rating, comment} : Reviews){

    return(
        <div className='flex flex-col w-full h-full gap-5'>

            <div className="flex items-center justify-between">

                <div className='flex gap-4'>
                    <PhotoProfile imageUrl={imgProfile} size={sizeImageUser}  />
                    <div>
                        <h2>{nameUser}</h2>
                        <h3>{when}</h3>
                    </div>
                </div>

                <StartRating rating={rating}/>
            </div>

            {comment && <p className="text-gray-300 text-sm">{comment}</p>}

        </div>
    )
}