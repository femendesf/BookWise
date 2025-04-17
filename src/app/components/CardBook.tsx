import Image from "next/image";
import { StarRating } from "./StarRating";

interface PopularBooksProps{
    title: string;
    author: string;
    imgBook: string;
    alt: string;
    rating: number;
    category?: string[];
    pages?: number;

    index: number;

    widthAvatar: number;
    heightAvatar: number;

    blockedClick?: boolean;
    sizeStar?: number;

    styleH2?: string;
    styleH3?: string;
}


export function CardBook({title, author, rating, alt, imgBook, widthAvatar, heightAvatar, blockedClick, sizeStar, styleH2, styleH3 } : PopularBooksProps){

    return(
        <div 
            className={`flex gap-5 bg-gray-700 p-5 rounded-lg overflow-hidden h-full border border-x-2 border-gray-700 ${!blockedClick && `hover:cursor-pointer hover:border hover:border-x-2 hover:border-gray-600`}`}
        >
            <Image className={`rounded-md object-cover`} src={imgBook} alt={alt} width={widthAvatar} height={heightAvatar}  style={{width: `${widthAvatar}px`, height: `${heightAvatar}px`,}}/>

            <div className="flex flex-col justify-between">
                <div> 
                    <h2 className={`line-clamp-2 ${styleH2 ? styleH2 : `text-base`} text-gray-100  `}>{title}</h2>
                    <h3 className={`${styleH3 ? styleH3 : `text-sm`} text-gray-400 line-clamp-2`}>{author}</h3>
                </div>

                <StarRating rating={rating} size={sizeStar}/>
            </div>
        </div>
    )
}