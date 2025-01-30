'use client'

import Image from 'next/image'
import { Star } from "@phosphor-icons/react";
import { PhotoProfile } from '../../PhotoProfile';
import { motion } from 'framer-motion';

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
    const totalStars = 5;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index} // Passando o index para o delay funcionar corretamente
            className="flex flex-col gap-8 bg-gray-700 h-[17.5rem] rounded-lg p-6 mt-3 overflow-hidden"
        >
            <div className='flex items-center justify-between'>
                <div className='flex gap-4'>
                    <PhotoProfile imageUrl={imgProfile} size='3rem' width={40} height={40} />
                    <div>
                        <h2>{name}</h2>
                        <h3>{when}</h3>
                    </div>
                </div>

                <div className='flex gap-1 text-purple-100'>
                    {Array.from({ length: totalStars }, (_, i) => (
                        <Star key={i} size={16} weight={i < rating ? "fill" : "regular"} />
                    ))}
                </div>
            </div>

            <div className='flex gap-5'>
                <Image src={imgBook} alt="image-home" width={108} height={152} />
                <div className='flex flex-col justify-between'>
                    <div>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </motion.div>
    )
}
