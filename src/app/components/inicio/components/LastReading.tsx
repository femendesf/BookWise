import { Star } from "@phosphor-icons/react";
import Image from "next/image";
import Cover from '@/public/assets/livrosAlgoritmos.svg'

export function LastReading(){
    return(
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-200">Sua última leitura</span>
                <button className="text-purple-100 hover:text-purple-hoover">Ver todos</button>
            </div>

            <div className='flex flex-col gap-8 bg-gray-600 w-[38rem] h-48 rounded-lg p-6 mt-3' >

            
                <div className='flex gap-5'>
                
                <Image src={Cover} alt="image-home" width={108} height={152}/>

                    <div className='flex flex-col justify-between'>

                        <div className="flex flex-col gap-3">
                            <div className='flex items-center justify-between'>
                
                                <span className="text-gray-300 text-sm">Há 2 dias</span>

                                <div className='flex gap-1 text-purple-100'>
                                    <Star size={16}  weight="fill"/>
                                    <Star size={16}  weight="fill"/>
                                    <Star size={16}  weight="fill"/>
                                    <Star size={16}  weight="fill"/>
                                    <Star size={16} />
                                </div>

                            </div>

                            <div>
                                <h2>Entendendo Algoritmos</h2>
                                <span className='text-gray-400'>Aditya Bhargava</span>
                            </div>

                        </div>
                        
                        <p>Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectu...</p>
                    </div>
                </div> 
            </div>
        </div>
        
    )
}