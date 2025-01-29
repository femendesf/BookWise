'use client'

import Image from 'next/image'
import Profile from '../../../../public/assets/profile.svg'
import Cover from '../../../../public/assets/hobbit.svg'
import { Star } from "@phosphor-icons/react";
import { PhotoProfile } from '../../PhotoProfile';

interface RecentReviewsProps {
    imgProfile: string;
    name: string;
    when: string;
    title: string;
    author: string;
    imgBook: string;
    rating: number;
    description: string;

}


export function RecentReviews({name, imgProfile, when, title, author, imgBook, rating, description}: RecentReviewsProps) {

    const totalStars = 5;

    return(
        <div className='flex flex-col gap-8 bg-gray-700 w-[38rem] h-[17.5rem] rounded-lg p-6 mt-3' >

            <div className='flex items-center justify-between'>
                
                <div className='flex gap-4'>

                    <PhotoProfile imageUrl={imgProfile} size='3rem' width={40} height={40}/>

                    <div>
                        <h2>{name}</h2>
                        <h3>{when}</h3>
                    </div>
                   
                </div>
                
                <div className='flex gap-1 text-purple-100'>
                    {Array.from({length: totalStars}, (_, index) => (

                        <Star key={index} size={16} weight={index < rating ? "fill" : "regular"}/>)
                    )}
                </div>

            </div>
            
            <div className='flex gap-5'>
               
               <Image src={imgBook} alt="image-home" width={108} height={152}/>

                <div className='flex flex-col justify-between'>  
                    <div>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                    </div>
                    
                    <p>{description}</p>
                </div>

            </div> 
        </div>
    )
}