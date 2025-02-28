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

    const [hoveredStars, setHoveredStars] = useState<number | null>(null);// Estado para armazenar o índice da estrela atualmente hoverada
    const [starSelected, setStarSelected] = useState<number | null>(null); // Estado para armazenar a estrela selecionada pelo usuário
    
      const handleStarClick = (value: number) => {

        setStarSelected(value);
        
        if (setQuantityStarsRating) {
          setQuantityStarsRating(value);
        }
    };


    return(

        <div className='flex gap-1 text-purple-100 '>

            {userRating ? // Verifica se a função de setar a quantidade de estrela clicada foi passada

                starSelected ?
                
                    Array.from({length: totalStars} ,(_, index) => {

                        const isFilled =
                                starSelected !== null ? index + 1 <= starSelected : false; // Verifica se a estrela atual é preenchida com base no hover
                                
                            const isHalf =
                                starSelected !== null &&
                                index + 0.5 <= starSelected &&
                                index + 1 > starSelected; // Verifica se a estrela atual é a metade da estrela hoverada


                        return(
                            <div
                                key={index}
                                className="relative inline-block w-fit cursor-pointer"
                            >
                                <Star size={size} weight="regular" />

                                {/* Preencher estrela completa */}
                                {isFilled && (
                                    <div className="absolute inset-0">
                                    <Star size={size} weight="fill" />
                                    </div>
                                )}

                                {/* Preencher metade da estrela */}
                                {isHalf && (
                                    <div className="absolute inset-0 overflow-hidden left-0 top-0 w-1/2">
                                    <Star size={size} weight="fill" />
                                    </div>
                                )}
                            </div>
                            
                        )
                    }
                    ) // Renderiza as estrelas preenchidas com base na avaliação do usuário
                    
                :

                    <div
                        className="flex gap-1"
                        onMouseLeave={() => setHoveredStars(null)}
                    >
                        {Array.from({ length: totalStars }, (_, index) => {
                            const isFilled =
                                hoveredStars !== null ? index + 1 <= hoveredStars : false; // Verifica se a estrela atual é preenchida com base no hover
                                
                            const isHalf =
                                hoveredStars !== null &&
                                index + 0.5 <= hoveredStars &&
                                index + 1 > hoveredStars; // Verifica se a estrela atual é a metade da estrela hoverada

                            return (
                                <div
                                    key={index}
                                    className="relative inline-block w-fit cursor-pointer"
                                    onMouseMove={(e) => {
                                        const { offsetX } = e.nativeEvent as any;
                                        const width = e.currentTarget.offsetWidth;
                                        if (!width) return;
                                        const fraction = offsetX < width / 2 ? 0.5 : 1;

                                        setHoveredStars(index + fraction);
                                    }}
                                    
                                    onClick={() => {
                                        if (hoveredStars !== null) {
                                            handleStarClick(hoveredStars);
                                        }
                                    }}
                                >
                                    {/* Estrela base (vazia) */}
                                    <Star size={size} weight="regular" />

                                    {/* Preencher estrela completa */}
                                    {isFilled && (
                                        <div className="absolute inset-0">
                                        <Star size={size} weight="fill" />
                                        </div>
                                    )}

                                    {/* Preencher metade da estrela */}
                                    {isHalf && (
                                        <div className="absolute inset-0 overflow-hidden left-0 top-0 w-1/2">
                                        <Star size={size} weight="fill" />
                                        </div>
                                    )}

                                </div>
                                );
                        })} {/* preenchendo a estrela com base no hover, se o mouse estiver ao lado esquerdo da estrela, ela é meio preenchida, se não, ela é totalmente preenchida */}
                                
                    </div> // Estrelas para preenchimento
                
                :

                Array.from({length: totalStars} ,(_, index) => {
                    const isFilled = index + 1 <= rating; // Verifica se a estrela deve ser preenchida
                    const isHalf = index + 0.5 <= rating && index + 1 > rating; // Verifica se a estrela é meio preenchida

                    return (
                        <div key={index} className="relative inline-block w-fit">
                          <Star
                            size={size}
                            weight={isFilled ? "fill" : "regular"}
                          />
              
                          {/* Preencher metade da estrela */}
                          {isHalf && (
                            <div className="absolute inset-0 overflow-hidden left-0 top-0 w-1/2">
                                <Star size={size} weight="fill"/>
                            </div>
                            )}
                        </div>
                      );
                }) // Renderiza as estrelas preenchidas com base nas avaliações ja salvas

            }
        </div>
    )
}