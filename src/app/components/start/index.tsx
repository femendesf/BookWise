'use client'

import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { PopularBooks } from "./components/PopularBooks";
import { LastReading } from "./components/LastReading";

import Hobbit from '../../../public/assets/hobbit.svg'
import Jaxson from '../../../public/assets/profile.svg'
import Brandon from '../../../public/assets/brandon.svg'
import Book1 from '../../../public/assets/o-guia-do-mochileiro.png'
import Lindsey from '../../../public/assets/lindsey.svg'
import Algoritmo from '../../../public/assets/livrosAlgoritmos.svg'

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";

import { listBooks } from "@/utils/listBooks";

interface StartProps{
    loggedIn: boolean;
}

export function Start({loggedIn} : StartProps){
    
    const habitos = Book1.src
    
    return(

        <motion.div
            {...fadeIn}
        >
        <div id="start" className="flex justify-between">

            <div className="flex flex-col gap-10 mb-1 w-[48.75rem] xxl:w-[51.25rem]">

                <h1 className="flex gap-3">
                    <ChartLineUp size={32} className="text-green-100"/>
                    Início
                </h1>
           
                {loggedIn && <LastReading />}

                <div>
                    <span className="text-gray-100 text-sm">Avaliações mais recentes</span>

                    <RecentReviews 
                        title="O Hobbit" 
                        author="J.R.R. Tolkien"
                        imgBook={Hobbit}
                        imgProfile={Jaxson}
                        name="Jaxson Dias"
                        when="Hoje"
                        rating={4}
                        description="Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh... ver mais"
                        index={1}/>

                    <RecentReviews
                        name="Brandon Botosh"
                        when="Ontem"
                        imgProfile={Brandon}
                        title="O guia do mochileiro das galáxias"
                        author="Douglas Adams"
                        imgBook={habitos}
                        description="Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget"
                        rating={4}
                        index={2}
                    />

                    <RecentReviews
                        name="Lindsey Philips"
                        when="Ontem"
                        imgProfile={Lindsey}
                        rating={5}
                        title="Entendendo Algoritmos"
                        author="Aditya Bhargava"
                        imgBook={Algoritmo}
                        description="Integer at tincidunt sed mi. Venenatis nunc justo porta viverra lacus scelerisque ut orci ultricies. Massa ultrices lacus non lectus pellentesque cras posuere neque. Nunc nisl curabitur et non. Tellus senectus elit porta lorem."
                        index={3}
                    />
                    
                </div>

            </div>
            
            <div className="flex flex-col gap-4 w-96 ml-16 xxl:20 overflow-hidden">

                <div className="flex justify-between text-sm">
                    <span className="text-gray-100">Livros populares</span>
                    <button className="text-purple-100 hover:text-purple-hoover">Ver todos</button>
                </div>

                {listBooks.slice(0, 4).map(({title, author, cover, rating, id}) => (
                    <div className="h-36" key={id}>
                        <PopularBooks
                            key={id}
                            imgBook={cover}
                            alt={`Capa livro ${title}`}
                            title={title}
                            author={author}
                            rating={rating}
                            index={id}
                            width={64}
                            height={94}
                    />
                    </div>
                   
                ))}

            </div>
        </div>
        </motion.div>
    )

}