import Image from "next/image";
import GeorgeOrwell from '../../../../public/assets/livroGeorge.svg'
import { Star } from "@phosphor-icons/react";

export function PopularBooks(){
    return(
        <div className="flex flex-col gap-4 w-[20.25rem] ml-16">

            <div className="flex justify-between text-sm">
                <h2 className="text-gray-100">Livros populares</h2>
                <button className="text-purple-100 hover:text-purple-hoover">Ver todos</button>
            </div>

            <div className="flex gap-5 bg-gray-700 p-5 rounded-lg">
                <Image src={GeorgeOrwell} alt="A revolução dos bichos" width={64} height={94} />

                <div className="flex flex-col justify-between">
                    <div> 
                        <h3 className="text-gray-100">A revolução dos bichos</h3>
                        <p className="text-gray-400">George Orwell</p>
                    </div>
                   
                    <div className='flex gap-1 text-purple-100'>
                        <Star size={16}  weight="fill"/>
                        <Star size={16}  weight="fill"/>
                        <Star size={16}  weight="fill"/>
                        <Star size={16}  weight="fill"/>
                        <Star size={16} />
                    </div>
                </div>

            </div>
        </div>
    )
}