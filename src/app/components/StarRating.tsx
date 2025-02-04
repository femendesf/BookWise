import { Star } from "@phosphor-icons/react"

interface StarRatingProps{
    rating : number,
}

export function StartRating({ rating } : StarRatingProps){

    const totalStars = 5

    return(
        <div className='flex gap-1 text-purple-100'>
            {Array.from({length: totalStars}, (_, index) => (

                <Star key={index} size={16} weight={index < rating ? "fill" : "regular"}/>)
            )}
        </div>
    )
}