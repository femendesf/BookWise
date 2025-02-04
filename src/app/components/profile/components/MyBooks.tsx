import { Star } from "@phosphor-icons/react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { StartRating } from "../../StarRating";

interface MyBooksProps {
    title: string;
    author: string;
    img: string;
    rating: number;
    description: string;
    dateLastReading: string;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20},
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
            delay: index*0.2
        }
    })
}


export function MyBooks({title, author, img, rating, description, dateLastReading, index}: MyBooksProps) {

    const totalStars = 5;

    return(

        <div className="flex flex-col w-[48.75rem] xxl:w-full h-auto mt-8 gap-2"> 
        <span className="text-sm text-gray-300">{dateLastReading != 'Hoje' ? `Há ${dateLastReading}` : dateLastReading}</span>
        
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="flex flex-col bg-gray-700 gap-6 p-6 rounded-lg"
        >{/* Card*/}

            <div className="flex gap-6">

                <Image src={img} alt="Capa do livro" width={98} height={134} />

                <div className="flex flex-col justify-between">

                    <div className="flex flex-col">
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>

                    <StartRating rating={rating}/>

                </div>
        
            </div>

            <p>{description}</p>
        </motion.div>
    </div>
   
    )
}