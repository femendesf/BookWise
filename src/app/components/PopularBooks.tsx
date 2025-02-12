'use client'

import Image from "next/image";
import {motion} from 'framer-motion'
import { useState } from "react";
import { StarRating } from "./StarRating";
import { SidePanel } from "./SidePanel";

interface PopularBooksProps{
    title: string;
    author: string;
    imgBook: string;
    alt: string;
    rating: number;
    index: number;
    width: number;
    height: number;
    blockedClick?: boolean;
    sizeStar?: number;
    onCLick?: () => void;
   
}


export function PopularBooks({title, author, rating, alt, imgBook, width, height, blockedClick, sizeStar, index, onCLick} : PopularBooksProps){

    const [clickOnBook, setClickOnnBook] = useState(false)
    
    return(
        <>
            <div 
                className={`flex gap-5 bg-gray-700 p-5 rounded-lg overflow-hidden h-full border border-x-2 border-gray-700 ${!blockedClick && `hover:cursor-pointer hover:border hover:border-x-2 hover:border-gray-600`}`}
                onClick={() => !blockedClick && setClickOnnBook(true) }
            >

                <Image className="rounded-md" src={imgBook} alt={alt} width={width} height={height} />

                <div className="flex flex-col justify-between">
                    <div> 
                        <h2 className="line-clamp-2">{title}</h2>
                        <h3>{author}</h3>
                    </div>

                <StarRating rating={rating} size={sizeStar}/>
                </div>

            </div>

            {clickOnBook && <SidePanel title={title} author={author} imgCover={imgBook} rating={rating} index={index} clickedExitBook={setClickOnnBook}/>}

        </>
       
       
    )
}