'use client'

import { useState } from "react";
import { Binoculars } from "@phosphor-icons/react";
import { InputSearchBook } from "../../../components/InputSearchBook";
import { CardBook } from "../../../components/CardBook";
import { MotionCard } from "@/utils/motionDiv";
import {motion} from 'framer-motion'

import { Loading } from "@/app/components/Loading";
import { useFilteredBooks } from "@/hooks/useFilteredBooks";

interface DiscoverProps {
    setSelectedBook: (book: any) => void;
}

export interface Book {
  id: string
  googleId?: string
  title: string
  author: string
  cover: string
  rating: number
  description: {
    category: string[]
    pages: number
  }
}

export function Discover({ setSelectedBook }: DiscoverProps) {
    
    const [textSearch, setTextSearch] = useState(""); // Armazenando o texto da busca
    const [genreSelected, setGenreSelected] = useState('Tudo') // Armazenando o gênero selecionado

    const { data: booksFiltered = [], isLoading } = useFilteredBooks({ textSearch, genreSelected });
 
    const buttons = [
        {
            id: 'Tudo',
            label: 'Tudo',
        },
        {
            id: 'Computers',
            label: 'Computação',
        },
        {
            id: 'Education',
            label: 'Educação',
        },
        {
            id: 'Fantasy',
            label: 'Fantasia',
        },
        {
            id: 'Science Fiction',
            label: 'Ficção Científica',
        },
        {
            id: 'Horror',
            label: 'Horror',
        },
        {
            id: 'Comics & Graphic Novels',
            label: 'HQs',
        },
        {
            id: 'Thrillers & Suspense',
            label: 'Suspense',
        },
        
    ]

    return (
       <div className=" flex flex-col w-[75rem] xxl:w-[80rem] " id="style-info-cards">

            <div className="flex items-center justify-between">

                <div className="flex gap-3 items-center">
                    <Binoculars className="text-green-100" size={32}/>
                    <h1 >Explorar</h1>
                </div>

                <div className=" w-[28.75rem] h-12 ">
                    <InputSearchBook
                        placeholder="Buscar livro ou autor"
                        setTextSearch={setTextSearch}
                        textSearch={textSearch}
                        isClickable
                       
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-10 mb-12 ml-10">
                {buttons.map(({id, label})=> (
                    <button 
                        key={id}
                        className={`${genreSelected === id ? 'text-gray-100 bg-purple-200': 'border-purple-100 text-purple-100 border hover:bg-purple-200 hover:text-gray-100'}
                            px-4 py-1 rounded-full`}
                        onClick={() => setGenreSelected(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            
               { isLoading ? (
                    <div className="flex items-center justify-center mt-56">
                       <Loading/>
                    </div>
                  
                ) : 
                    <div>
                        {booksFiltered.length <= 0 ? 
                            <div className="flex items-center justify-center mt-56">
                                <span className="text-purple-100 text-center text-xl font-bold">Nenhum livro encontrado</span>
                            </div>
                        : 
                            <div className="grid grid-cols-3 w-[69rem] gap-5 mb-10" >
                            {
                                booksFiltered.map((book : Book, index: number) => {

                                    const uniqueKey = `${book.googleId || book.title}-${index}`; // Use um ID se disponível
                                    return(
                                        <motion.div
                                            className="max-w-[22.5rem] min-h-48"
                                            variants={MotionCard}
                                            initial="hidden"
                                            animate="visible"
                                            custom={index} 
                                            key={uniqueKey} // 🔑 isso força a recriação quando muda categoria ou busca
                                            onClick={() => setSelectedBook({
                                                ...book,
                                                description:{
                                                    category: book.description.category || [],
                                                    pages: book.description.pages || 0,
                                                }
                                            })}
                                        >
                                            <CardBook
                                                key={book.id}
                                                imgBook={book.cover}
                                                index={index}
                                                title={book.title}
                                                alt={`Capa livro ${book.title}`}
                                                author={book.author}
                                                rating={book.rating}
                                                sizeStar={20}
                                                widthAvatar={108}
                                                heightAvatar={152}
                                                category={book.description.category}
                                                pages={book.description.pages}
                                            />
                                        </motion.div>
                                )})}
                            </div>
                        }
                    </div>
                }
       </div>
    );
}
