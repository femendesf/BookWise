'use client'

import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { PopularBooks } from "./components/PopularBooks";
import { LastReading } from "./components/LastReading";

import Hobbit from '../../../public/assets/hobbit.svg'
import Jaxson from '../../../public/assets/profile.svg'
import Brandon from '../../../public/assets/brandon.svg'
import Book1 from '../../../public/assets/book1.png'
import Lindsey from '../../../public/assets/lindsey.svg'
import Algoritmo from '../../../public/assets/livrosAlgoritmos.svg'

import GeorgeOrwell from '../../../public/assets/livroGeorge.svg'
import Habitos from '../../../public/assets/habitos.svg'
import OFimDaEternidade from '../../../public/assets/oFimDaEternidade.svg'

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";

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

                <PopularBooks 
                    imgBook={GeorgeOrwell}
                    alt="Capa livro A revolução dos bichos"
                    title="A revolução dos bichos"
                    author="George Orwell"
                    rating={4}
                    index={1}
                />

                <PopularBooks
                    imgBook={Habitos}
                    alt="Capa 14 Hábitos de Desenvolvedores Alta..."
                    title="14 Hábitos de Desenvolvedores Altamente Produtivos"
                    author="Zeno Rocha"
                    rating={3}
                    index={2}
                />

                <PopularBooks
                    imgBook={OFimDaEternidade}
                    alt="Capa O Fim da Eternidade"
                    title="O Fim da Eternidade"
                    author="Isaac Asimov"
                    rating={4}
                    index={3}
                />

                <PopularBooks
                    imgBook={Algoritmo}
                    alt="Capa Entendendo Algoritmos"
                    title="Entendendo Algoritmos"
                    author="Aditya Bhargava"
                    rating={5}
                    index={4}
                />
            </div>
        </div>
        </motion.div>
    )

}