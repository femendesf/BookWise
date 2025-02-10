import { Star } from "@phosphor-icons/react"
import { useState } from "react";

interface StarRatingProps{
    rating : number,
    size?: number,
    userRating?: boolean;
    setQuantityStarsRating?: (quantity: number| null) => void;
}

export function StarRating({ rating, size, userRating, setQuantityStarsRating } : StarRatingProps){

    const totalStars = 5
    const [hoveredStars, setHoveredStars] = useState<number | null>(null);

    const [starSelected, setStarSelected] = useState<number | null>(null);
    
    const handleStarClick = (index: number) => {
        console.log(`COMPONENTE StarRating: ${index}`)
        setStarSelected(index);
        
        if(setQuantityStarsRating){
            setQuantityStarsRating(index)
        }
    };


    return(
        <div className='flex gap-1 text-purple-100 '>

            {userRating ? // Verifica se a função de setar a quantidade de estrela clicada foi passada

                starSelected ?
                
                Array.from({length: totalStars} ,(_, index) => (
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
                        onClick={() => handleStarClick(index + 1)}
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