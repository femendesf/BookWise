'use client'

import Image from "next/image";
import { Star } from "@phosphor-icons/react";
import {motion} from 'framer-motion'
import { useEffect, useState } from "react";
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
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.2, // Cada card terá um delay incremental
        }
    })
};

export function PopularBooks({title, author, rating, alt, imgBook, index, width, height, blockedClick} : PopularBooksProps){

    const [clicadoNoLivro, setClicadoNoLivro] = useState(false)
    
    console.log(`Estado atual do clicadoNoLivro: ${clicadoNoLivro}`)
    return(
        <>
            <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index} // Passando o index para o delay funcionar corretamente
                className="flex gap-5 bg-gray-700 p-5 rounded-lg overflow-hidden h-full"
                onClick={() => !blockedClick && setClicadoNoLivro(true)}
            >

                <Image className="rounded-md" src={imgBook} alt={alt} width={width} height={height} />

                <div className="flex flex-col justify-between">
                    <div> 
                        <h2 className="line-clamp-2">{title}</h2>
                        <h3>{author}</h3>
                    </div>

                <StarRating rating={rating}/>
                </div>

            </motion.div>

            {clicadoNoLivro && <SidePanel title={title} author={author} imgCover={imgBook} rating={rating} index={index} clickedExitBook={setClicadoNoLivro}/>}

        </>
       
       
    )
}