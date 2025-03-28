'use client'

import { useEffect, useState } from "react";
import { Binoculars } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { InputSearchBook } from "../../../components/InputSearchBook";
import { PopularBooks } from "../../../components/PopularBooks";
import { MotionCard } from "@/utils/motionDiv";
import {motion} from 'framer-motion'
import axios from "axios";
interface DiscoverProps {
    setSelectedBook: (book: any) => void;
}

export function Discover({ setSelectedBook }: DiscoverProps) {
    
    const [textSearch, setTextSearch] = useState("");
    const [genderSelected, setGenderSelected] = useState('Tudo')
    const [books, setBooks] = useState<any[]>([]); // Armazenando os livros
   
    const fetchBooks = async (query: string) => {
        console.log('Buscando livros com a query:');
        try {
            const response = await axios.get(`/api/books?q=${query}`);

            console.log('Livros recebidos:', response.data);
            const data = response.data;
           
            if (data.error) {
                console.error(data.error);
                setBooks([]);  // Reseta os livros em caso de erro
            } else {
                setBooks(data);  // Atualiza o estado com os livros recebidos
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            setBooks([]);  // Reseta os livros em caso de erro
        }
    };
    
    useEffect(() => {
        if (genderSelected === "Tudo") {
            fetchBooks("best+seller+brazil"); // Carregar livros populares automaticamente
        } else {
            fetchBooks(genderSelected); // Buscar livros específicos do gênero
        }
    }, [ genderSelected]);


    console.log(`LIVROS ${books}`);
    const buttons = [
        {
            id: 'Tudo',
            label: 'Tudo',
        },
        {
            id: 'Tecnology',
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

    const searchedBooks = books.filter(book =>
        (book.title && typeof book.title === "string" && book.title.toLowerCase().includes(textSearch.toLowerCase())) ||
        (book.author && typeof book.author === "string" && book.author.toLowerCase().includes(textSearch.toLowerCase()))
    );

    console.log("Livros no estado:", books);


    console.log(`GENERO SELECIONADO: ${genderSelected}`);
    return (
       <div className=" flex flex-col w-[75rem] xxl:w-[80rem]" id="style-info-cards">
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

            <div className="grid grid-cols-3 w-[69rem] gap-5 mb-10">
            
               { textSearch != '' ? (
                    // Exibe livros filtrados pela pesquisa
                    searchedBooks.slice(0, 15).map((book, index) => (
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
            </div> {/* Grid Books */}

       </div>
    );
}
