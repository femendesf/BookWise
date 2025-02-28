'use client'

import Image from "next/image";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { SidePanel } from "./SidePanel";

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
    // onCLick?: () => void;

    styleH2?: string;
    styleH3?: string;

    // loggedIn?:  (logged: boolean) => void;
   
}


export function PopularBooks({title, author, rating, alt, imgBook, widthAvatar, heightAvatar, blockedClick, sizeStar, index, styleH2, styleH3, category, pages, } : PopularBooksProps){

    const [clickOnBook, setClickOnBook] = useState(false)

    return(
        <>
            <div 
                className={`flex gap-5 bg-gray-700 p-5 rounded-lg overflow-hidden h-full border border-x-2 border-gray-700 ${!blockedClick && `hover:cursor-pointer hover:border hover:border-x-2 hover:border-gray-600`}`}
                onClick={() => !blockedClick && setClickOnBook(true) }
            >

                <Image className="rounded-md" src={imgBook} alt={alt} width={widthAvatar} height={heightAvatar} />

                <div className="flex flex-col justify-between">
                    <div> 
                        <h2 className={`line-clamp-2 ${styleH2 ? styleH2 : `text-base`} text-gray-100  `}>{title}</h2>
                        <h3 className={`${styleH3 ? styleH3 : `text-sm`} text-gray-400`}>{author}</h3>
                    </div>

                    <StarRating rating={rating} size={sizeStar}/>
                </div>

                

            </div>
            
        </>
       
       
    )
}