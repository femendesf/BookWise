'use client'
import { CaretLeft, User } from "@phosphor-icons/react";
import { MyBooks } from "./components/MyBooks";
import { MyProfile } from "./components/MyProfile";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/fadeOut";
import { InputSearchBook } from "../../../components/InputSearchBook";

import { bookSearch } from "@/utils/bookSearch";

export function Profile() {

    // const [buttonSearch, setButtonSearch] = useState(false)//Verifica se o botao de pesquisa foi clicado
    const [textSearch, setTextSearch] = useState('')

    const resultSearch = bookSearch.filter(book => book.title.toLowerCase().includes(textSearch.toLowerCase()))

    function handleTextSearch(){
        setTextSearch('')
    }

    return(
        <div className="flex justify-start gap-16">

            <div className="xxl:min-w-[60rem] w-[48.75rem]">
                <motion.div
                    key={textSearch ? "clicked" : "default"}
                    {...fadeIn}
                >
                    {!textSearch ?

                        <h1 className="flex items-center gap-3 ">
                            <User className="text-green-100" size={32}/>
                            Perfil
                        </h1>
                        :
                        <button
                            className="flex items-center text-base text-gray-200 gap-3"
                            onClick={handleTextSearch}
                        >
                            <CaretLeft size={20}/>
                            Voltar
                        </button>
                    }
                </motion.div>

                <div className="h-12 mt-10 w-full">
                    {/* Search bar */}
                    <InputSearchBook
                    placeholder="Buscar livro avaliado" setTextSearch={setTextSearch} textSearch={textSearch}/>
                </div>
                
              
                {!textSearch ?
                    <div>
                        {[...bookSearch].reverse().slice(0, 3).map(({title, author, img, rating, description, dateLastReading}, index) => (
                            <motion.div
                                {...fadeIn}
                                key={index}
                            >
                                <MyBooks
                                    title={title}
                                    author={author}
                                    img={img}
                                    rating={rating}
                                    description={description}
                                    dateLastReading={dateLastReading}
                                    index={index}
                                    
                                />
                            </motion.div>
                        ))}
                    </div>

                    :
                    <div>
                        {[...resultSearch].reverse().map(({title, author, img, rating, description, dateLastReading}, index) => {

                            return(
                                <motion.div
                                    {...fadeIn} 
                                    key={index}
                                >
                                    <MyBooks
                                        title={title}
                                        author={author}
                                        img={img}
                                        rating={rating}
                                        description={description}
                                        dateLastReading={dateLastReading}
                                        index={index}
                                       
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                }

            </div>

            <MyProfile/>
        </div>
    )
}