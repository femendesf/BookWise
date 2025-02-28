'use client'

import Image from 'next/image'
import { motion } from 'framer-motion';
import { ReviewUser } from '../../../../components/ReviewUser';

import { MotionCard } from '@/utils/motionDiv';
import { PopularBooks } from '../../../../components/PopularBooks';
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

export function RecentReviews({ name, imgProfile, when, title, author, imgBook, rating, description, index }: RecentReviewsProps) {
    

    return (
        <motion.div
            variants={MotionCard}
            initial="hidden"
            animate="visible"
            custom={index} // Passando o index para o delay funcionar corretamente
            className="flex flex-col gap-8 bg-gray-700 w-full rounded-lg p-6 mt-3 "
            id='recent-reviews'
        >
            <ReviewUser imgProfile={imgProfile} nameUser={name} when={when} rating={rating} sizeImageUser='2.5rem' />

            <div className='flex gap-5'>

                <Image src={imgBook} alt="image-home" width={280} height={290} />
                <div className='flex flex-col justify-between'>
                    <div>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>
                    <p className='line-clamp-4 text-gray-300 text-sm'>{description}</p>
                </div>
            </div>
        </motion.div>
    )
}
