import { Star } from "@phosphor-icons/react";
import Image from "next/image";

interface MyBooksProps {
    title: string;
    author: string;
    img: string;
    rating: number;
    description: string;

}


export function MyBooks({title, author, img, rating, description}: MyBooksProps) {

    const totalStars = 5;

    return(

        <div className="flex flex-col w-[39rem] h-auto mt-8 gap-2"> 

        <span className="text-sm text-gray-300">Há 2 dias</span>

        <div className="flex flex-col bg-gray-700 gap-6 p-6 rounded-lg"> {/* Card*/}

            <div className="flex gap-6">

                <Image src={img} alt="Capa do livro" width={98} height={134} />

                <div className="flex flex-col justify-between">

                    <div className="flex flex-col">
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

            <p>{description}</p>
        </div>

    </div>
    )
}