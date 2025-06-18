import Image from "next/image";
import { motion } from "framer-motion";
import { StarRating } from "../../../../../components/StarRating";
import { useProfileStore } from "@/store/profileStore";
import { convertDateRead } from "@/utils/convertDateRead";

interface LastReadingProps {
    setButtonSeeAll: (page: 'inicio' | 'perfil' | 'explorar') => void
}
export function LastReading({setButtonSeeAll} : LastReadingProps){

    const {bookItems} = useProfileStore()
    console.log('Livros lidos:', bookItems)
    
    const bookRead = bookItems[0]

    const formattedDate = convertDateRead(bookRead.dateLastReading)
    return(

        <motion.div
            initial={{ opacity: 0 }}  // Começa invisível
            animate={{ opacity: 1 }}  // Aparece gradualmente
            transition={{ duration: 0.8, ease: "easeOut" }} // Tempo de transição
        >

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-200">Sua última leitura</span>
                    <button 
                        className="text-purple-100 hover:text-purple-hoover hover:bg-purple-100 hover:bg-opacity-10 p-1 rounded"
                        onClick={() => setButtonSeeAll('perfil')}
                        >
                            Ver todas
                    </button>
                </div>

        
                <div
                    className='flex flex-col gap-8 bg-gray-600 h-48 rounded-lg p-6 mt-3 overflow-hidden'
                    id="recent-reviews"
                >
                    <div className='flex gap-5'>
            
                        <Image src={bookRead.cover} alt="image-home" width={108} height={152}/>

                        <div className='flex flex-col justify-between'>

                            <div className="flex flex-col gap-3">
                                <div className='flex items-center justify-between'>
                    
                                    <span className="text-gray-300 text-sm">{formattedDate}</span>

                                    <StarRating rating={4} size={16}/>

                                </div>

                                <div>
                                    <h2>{bookRead.title}</h2>
                                    <span className='text-gray-400'>{bookRead.author}</span>
                                </div>

                            </div>

                            <p className="text-gray-300 text-sm">{bookRead.synopsis}</p>
                        </div>
                    </div> 
                </div>
            </div>
        </motion.div>
    )
}