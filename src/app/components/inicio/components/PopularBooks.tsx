import Image from "next/image";

import { Star } from "@phosphor-icons/react";

interface PopularBooksProps{
    title: string;
    author: string;
    imgBook: string;
    alt: string;
    rating: number;

}

export function PopularBooks({title, author, rating, alt, imgBook} : PopularBooksProps){

    const totalStars = 5

    return(

        <div className="flex gap-5 bg-gray-700 p-5 rounded-lg">

            <Image src={imgBook} alt={alt} width={64} height={94} />

            <div className="flex flex-col justify-between">
                <div> 
                    <h2>{title}</h2>
                    <h3>{author}</h3>
                </div>
                

                    <div className='flex gap-1 text-purple-100'>
                    {Array.from({length: totalStars}, (_, index) => (

                        <Star key={index} size={16} weight={index < rating ? "fill" : "regular"}/>)
                    )}
                </div>
            </div>

        </div>
       
    )
}