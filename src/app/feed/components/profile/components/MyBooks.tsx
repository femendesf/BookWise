import Image from "next/image";
import { motion } from 'framer-motion';
import { StarRating } from "../../../../components/StarRating";

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

    return(

        <div className="flex flex-col w-full h-auto mt-8 gap-2"> 
            <span className="text-sm text-gray-300">{dateLastReading != 'Hoje' ? `Há ${dateLastReading}` : dateLastReading}</span>
            
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="flex flex-col bg-gray-700 gap-6 p-6 rounded-lg"
            >{/* Card*/}

                <div className="flex gap-6" id="recent-reviews">

                    <Image src={img} alt="Capa do livro" width={120} height={134} />

                    <div className="flex flex-col justify-between">

                        <div className="flex flex-col">
                            <h2>{title}</h2>
                            <h3>{author}</h3>
                        </div>

                        <StarRating rating={rating}/>

                    </div>
            
                </div>

                <p className="text-gray-300 text-sm">{description}</p>
            </motion.div>
        </div>
    )
}