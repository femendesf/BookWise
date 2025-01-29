import { CaretLeft, MagnifyingGlass, User } from "@phosphor-icons/react";
import { MyBooks } from "./components/MyBooks";
import { MyProfile } from "./components/MyProfile";
import EntendendoAlgoritmo from '../../../public/assets/livrosAlgoritmos.svg'

import Hobbit from '../../../public/assets/hobbit.svg'
import OGuiadoMochileiro from '../../../public/assets/book1.png'
import React, { useState } from "react";
import { BookSearchResult } from "./components/BookSearchResult";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { z } from "zod";

const searchSchema = z.object({
    query: z.string().min(3, 'Digite pelo menos 3 caracters')
})

export function Profile() {

    const capaOGuidaDoMochileiro = OGuiadoMochileiro.src

    const [botaoClicado, setBotaoClicado] = useState(false)
    const [query, setQuery] = useState('')
    const [error, setError] = useState('')

    function handleButtonClicked(clicado: boolean){
        setBotaoClicado(clicado)
    }
    
    function handlInputChange(event: React.ChangeEvent<HTMLInputElement>){ //Verificar eventos do input

        const value = event.target.value;
        setQuery(value)

        //Validação com ZOD
        const result = searchSchema.safeParse({query: value});

        if(!result.success){
            setError(result.error.errors[0].message)
        }else{
            setError('')
        }

    }


    return(
        <div className="flex justify-start gap-16"> 

            <div>
                <motion.div
                    key={botaoClicado ? "clicked" : "default"}
                    {...fadeIn}
                >
                    {!botaoClicado ? 
                        
                        <h1 className="flex items-center gap-3 ">
                            <User className="text-green-100" size={32}/> 
                            Perfil
                        </h1>
                        :
                        <button 
                            className="flex items-center text-base text-gray-200 gap-3"
                            onClick={()=> handleButtonClicked(false)}
                        >
                            <CaretLeft size={20}/>
                            Voltar
                        </button>
                    }
                </motion.div>

                <div className="flex items-center justify-between gap-3 h-12 border border-gray-500 rounded-md px-5 mt-10"> {/* Search bar */}

                    <input 
                        className="text-gray-400 focus:outline-none text-sm bg-transparent w-full "
                        type="text"
                        placeholder="Buscar livro avaliado"
                        value={query}
                        onChange={handlInputChange}
                    />

                    <button 
                        className= {`text-gray-500 hover:text-gray-400 ${error? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        onClick={()=> !error && handleButtonClicked(true)}
                    > 
                        <MagnifyingGlass  size={20}/>
                    </button>


                </div>
                
                {!botaoClicado ? 
                    <div>
                        <MyBooks 
                            title="Entendendo Algoritmos" 
                            author="Aditya Bhargava"
                            img={EntendendoAlgoritmo}
                            rating={5}
                            description="Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam. Mollis et luctus amet sed convallis varius massa sagittis.
                            Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer pellentesque."
                            dateLastReading="2 dias"
                            index={1}
                        />
    
                        <MyBooks
                            title="O Hobbit"
                            author="J.R.R. Tolkien"
                            img={Hobbit}
                            rating={4}
                            description="Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet."
                            dateLastReading="4 meses"
                            index={2}
                        />
    
                        <MyBooks
                            title="O guia do mochileiro das galáxias"
                            author="Douglas"
                            img={capaOGuidaDoMochileiro}
                            rating={4}
                            description="Ultrices nisl eu id id mattis. Adipiscing est sapien ut vestibulum nec enim. Nisi interdum orci malesuada nisi. Habitant placerat velit enim malesuada senectus ipsum. Ultricies nisl dictum integer hendrerit amet enim. Facilisis consectetur imperdiet ultrices mattis pharetra viverra magnis."
                            dateLastReading="6 meses"
                            index={3}
                        />
                    </div>
                    :
                    <BookSearchResult/>
                }
               
            </div>

            <MyProfile/>
        </div>
    )
}