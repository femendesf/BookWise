'use client'

import { useEffect, useState } from "react";
import { Binoculars } from "@phosphor-icons/react";
import { InputSearchBook } from "../../../components/InputSearchBook";
import { PopularBooks } from "../../../components/PopularBooks";
import { MotionCard } from "@/utils/motionDiv";
import {motion} from 'framer-motion'
import axios from "axios";

import { DotStream } from 'ldrs/react'
import 'ldrs/react/DotStream.css'

interface DiscoverProps {
    setSelectedBook: (book: any) => void;
}

export function Discover({ setSelectedBook }: DiscoverProps) {
    
    const [textSearch, setTextSearch] = useState("");
    const [genderSelected, setGenderSelected] = useState('Tudo')
    const [books, setBooks] = useState<any[]>([]); // Armazenando os livros
    const [loading, setLoading] = useState(true);

    const fetchBooks = async (query: string, gender: string) => { 

        setLoading(true); // Começa o carregamento
        try {
            const formattedQuery = query.trim().split(/\s+/).join('+');
            const response = await axios.get(`api/books?q=${formattedQuery}+subject:${gender}`);
            console.log('**********************************************************************************', formattedQuery)
            console.log('Livros recebidos:', response.data);
            const data = response.data;

            if (data.error) {
                console.error(data.error);
                setBooks([]);
            } else {
                setBooks(data);
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            setBooks([]);
        }finally{
            setLoading(false); // Finaliza o carregamento
        }
    };
    useEffect(() => {
        if(textSearch === ''){
            fetchBooks('best+sellers', genderSelected);
        } else{
            fetchBooks(textSearch, genderSelected);
        }
        
       
    }, [genderSelected, textSearch]);

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

    console.log('**********************************************************************************',genderSelected)
    console.log('**********************************************************************************',textSearch)
    const searchedBooks = books.filter(book =>
        (book.title && typeof book.title === "string" && book.title.toLowerCase().includes(textSearch.toLowerCase())) ||
        (book.author && typeof book.author === "string" && book.author.toLowerCase().includes(textSearch.toLowerCase()))
    );

    function handleButtonSearch(){
        console.log('********************************************************************************** CLICADO PRA PROCURAR',textSearch)
        fetchBooks(textSearch, genderSelected);
    }

    console.log(`GENERO SELECIONADO: ${genderSelected}`);
    return (
       <div className=" flex flex-col w-[75rem] xxl:w-[80rem] " id="style-info-cards">

            <div className="flex items-center justify-between">

                <div className="flex gap-3 items-center">
                    <Binoculars className="text-green-100" size={32}/>
                    <h1>Explorar</h1>
                </div>

                <div className=" w-[28.75rem] h-12 ">
                    <InputSearchBook
                        placeholder="Buscar livro ou autor"
                        setTextSearch={setTextSearch}
                        textSearch={textSearch}
                        isClickable
                        buttonSearch={handleButtonSearch}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-10 mb-12 ml-10">
                {buttons.map(({id, label})=> (
                    <button 
                        key={id}
                        className={`${genderSelected === id ? 'text-gray-100 bg-purple-200': 'border-purple-100 text-purple-100 border hover:bg-purple-200 hover:text-gray-100'}
                            px-4 py-1 rounded-full`}
                        onClick={() => setGenderSelected(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            
               { loading ? (
                    <div className="flex items-center justify-center mt-56">
                       <DotStream
                            size="60"
                            speed="2.5"
                            color="#50B2C0" 
                        />
                    </div>
                  
                ) : 
                        <div className="grid grid-cols-3 w-[69rem] gap-5 mb-10" >
                            {
                                 textSearch != '' ? (
                                    // Exibe livros filtrados pela pesquisa
                                    searchedBooks.slice(0, 15).map((book, index) => (
                                        <motion.div
                                            className="max-w-[22.5rem] max-h-52 "
                                            variants={MotionCard}
                                            initial="hidden"
                                            animate="visible"
                                            custom={index} 
                                            key={index}
                                            onClick={() => setSelectedBook({
                                                ...book,
                                                description:{
                                                    category: book.description.category || [],
                                                    pages: book.description.pages || 0,
                                                }
                                            })}
                                        >
                                            <PopularBooks
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
                                      ))
                                )
                                : (
                                    // Exibe livros filtrados pelo gênero
                                    
                                    books.map((book, index) => (
                                        <motion.div
                                            variants={MotionCard}
                                            initial="hidden"
                                            animate="visible"
                                            custom={index} 
                                            key={index}
                                            onClick={() => setSelectedBook({
                                                ...book,
                                                description:{
                                                    category: book.description.category || [],
                                                    pages: book.description.pages || 0,
                                                }
                                            })}
                                        >
                                            <PopularBooks
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
                                    ))
                                )
                            }
                        </div>
                }
       </div>
    );
}
