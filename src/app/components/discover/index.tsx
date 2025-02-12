'use client'

import { Binoculars } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { InputSearchBook } from "../InputSearchBook";

import { listBooks } from "@/utils/listBooks";
import { PopularBooks } from "../PopularBooks";

import {motion} from 'framer-motion'
import { MotionCard } from "@/utils/motionDiv";

export function Discover(){

    
    const [genderSelected, setGenderSelected] = useState('Tudo')
    const [textSearch, setTextSearch] = useState('')

    const buttons = [
        {
            id: 'Tudo',
            label: 'Tudo',
        },
        {
            id: 'Computação',
            label: 'Computação',
        },
        {
            id: 'Educação',
            label: 'Educação',
        },
        {
            id: 'Fantasia',
            label: 'Fantasia',
        },
        {
            id: 'Ficção Científica',
            label: 'Ficção Científica',
        },
        {
            id: 'Horror',
            label: 'Horror',
        },
        {
            id: 'HQs',
            label: 'HQs',
        },
        {
            id: 'Suspense',
            label: 'Suspense',
        },
        
    ]

    const filteredBooks = genderSelected === 'Tudo' 
    ? listBooks
    : listBooks.filter(book => book.description.category.includes(genderSelected)); // Filtrando os livros por genero

    const searchedBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(textSearch.toLowerCase())  || 
        book.author.toLowerCase().includes(textSearch.toLowerCase())
    ); // Filtrando os livros por pesquisa

    console.log(`LIVRO PESQUISADO: ${textSearch}`)

    useEffect(() => {
        
    } , [textSearch])

    return(
        <div className=" flex flex-col w-[75rem] xxl:w-[80rem]"> 

            <div className="flex items-center justify-between">

                <div className="flex gap-3 items-center">
                    <Binoculars className="text-green-100" size={32}/>
                    <h1>Explorar</h1>
                </div>
                
                <div className=" w-[28.75rem] h-12 ">
                    <InputSearchBook
                        placeholder="Buscar livro ou autor"
                        setTextSearch={setTextSearch}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-10 mb-12 ml-10">
                {buttons.map(({id, label})=> (
                    <button 
                        key={id}
                        className={`${genderSelected === id ?   
                            'text-gray-100 bg-purple-200'
                            : 
                            'border-purple-100 text-purple-100 border hover:bg-purple-200 hover:text-gray-100'}
                            px-4 py-1 rounded-full`}
                        onClick={() => setGenderSelected(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-3 w-[69rem] gap-5" key={genderSelected}>
                
               { textSearch != '' ? (
                    // Exibe livros filtrados pela pesquisa
                    searchedBooks.map(({ title, author, cover, rating, id }, index) => (
                        <motion.div
                            variants={MotionCard}
                            initial="hidden"
                            animate="visible"
                            custom={index} 
                            key={index}
                        >
                            <PopularBooks
                            key={id}
                            imgBook={cover}
                            index={index}
                            title={title}
                            alt={`Capa livro ${title}`}
                            author={author}
                            rating={rating}
                            sizeStar={20}
                            width={108}
                            height={152}
                            />
                        </motion.div>
                      ))
                )
                : (
                    // Exibe livros filtrados pelo gênero
                    
                    filteredBooks.map(({ title, author, cover, rating, id }, index) => (
                        <motion.div
                            variants={MotionCard}
                            initial="hidden"
                            animate="visible"
                            custom={index} 
                            key={index}
                        >
                            <PopularBooks
                                key={id}
                                imgBook={cover}
                                index={index}
                                title={title}
                                alt={`Capa livro ${title}`}
                                author={author}
                                rating={rating}
                                sizeStar={20}
                                width={108}
                                height={152}
                            />
                        </motion.div>
                    ))
                )
                }
            </div> {/* Grid Books */}
            
        </div>
    )
}
