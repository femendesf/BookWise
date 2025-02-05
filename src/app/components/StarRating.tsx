import { Star } from "@phosphor-icons/react"
import { useState } from "react";

interface StarRatingProps{
    rating : number,
    size?: number,
    userRating?: boolean;
}

export function StarRating({ rating, size, userRating } : StarRatingProps){

    const totalStars = 5
    const [hoveredStars, setHoveredStars] = useState<number | null>(null);

    const [starSelected, setStarSelected] = useState<number | null>(null);

    return(
        <div className='flex gap-1 text-purple-100 '>

            {userRating ?

                starSelected ?  Array.from({length: totalStars} ,(_, index) => (
                    <Star key={index} size={size} weight={index < starSelected ? "fill" : "regular"}/>
                ))// Guarda quantidade de estrela que o usuario clicou
                
                :

                Array.from({length: totalStars} ,(_, index) => {

                    const isFilled = index < (hoveredStars ?? rating);
                    
                    return(
                        <Star
                        key={index}
                        size={size}
                        weight={isFilled ? "fill" : "regular"}
                        onMouseEnter={() => setHoveredStars(index + 1)}
                        onMouseLeave={() => setHoveredStars(null)}
                        onClick={() => setStarSelected(hoveredStars)}
                        className="cursor-pointer transition-all duration-200"
                    />
                    )
                }) // para quando passar o mouse preencher as estrelas

                :
                Array.from({length: totalStars} ,(_, index) => (
                    <Star key={index} size={size} weight={index < rating ? "fill" : "regular"}/>
                )) //preenche as estrelas 

            }
        </div>
    )
}