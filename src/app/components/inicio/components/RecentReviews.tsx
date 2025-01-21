'use client'

import Image from 'next/image'
import Profile from '../../../../public/assets/profile.svg'
import Cover from '../../../../public/assets/hobbit.svg'
import { Star } from "@phosphor-icons/react";


export function RecentReviews() {
    return(
        <div className='flex flex-col gap-8 bg-gray-700 w-[38rem] h-[17.5rem] rounded-lg p-6 mt-3' >

            <div className='flex items-center justify-between'>
                <div className='flex gap-4'>
                    <Image src={Profile} alt="image-home" width={40} height={40}/>

                    <div>
                         <h1 className='text-gray-100 text-xl'>Jaxson Dias</h1>
                        <span className='text-gray-400'>Hoje</span>
                    </div>
                   
                </div>
                
                <div className='flex gap-1 text-purple-100'>
                    <Star size={16}  weight="fill"/>
                    <Star size={16}  weight="fill"/>
                    <Star size={16}  weight="fill"/>
                    <Star size={16}  weight="fill"/>
                    <Star size={16} />
                </div>

            </div>
            
            <div className='flex gap-5'>
               
               <Image src={Cover} alt="image-home" width={108} height={152}/>

                <div className='flex flex-col justify-between'>  
                    <div>
                        <h1 className='text-gray-100'>O Hobbit</h1>
                        <span className='text-gray-400'>J.R.R. Tolkien</span>
                    </div>
                    
                    <h2 className='text-gray-300 text-sm'>Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh... ver mais</h2>
                </div>

            </div> 
        </div>
    )
}