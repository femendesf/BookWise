'use client'

import Image from 'next/image'
import { motion } from 'framer-motion';
import { ReviewUser } from '../../ReviewUser';

interface RecentReviewsProps {
    imgProfile: string;
    name: string;
    when: string;
    title: string;
    author: string;
    imgBook: string;
    rating: number;
    description: string;
    index: number;  // Novo índice para controlar o delay
}

// Definição dos efeitos de animação
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

export function RecentReviews({ name, imgProfile, when, title, author, imgBook, rating, description, index }: RecentReviewsProps) {
   
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index} // Passando o index para o delay funcionar corretamente
            className="flex flex-col gap-8 bg-gray-700 h-[17.5rem] rounded-lg p-6 mt-3 overflow-hidden"
        >
            <ReviewUser imgProfile={imgProfile} nameUser={name} when={when} rating={rating} sizeImageUser='3rem' />

            <div className='flex gap-5'>
                <Image src={imgBook} alt="image-home" width={108} height={152} />
                <div className='flex flex-col justify-between'>
                    <div>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>
                    <p className='line-clamp-4'>{description}</p>
                </div>
            </div>
        </motion.div>
    )
}
