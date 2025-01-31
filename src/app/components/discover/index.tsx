import { Binoculars } from "@phosphor-icons/react";
import { PopularBooks } from "../start/components/PopularBooks";
import { useEffect, useState } from "react";
import { InputSearchBook } from "../InputSearchBook";

import { listBooks } from "@/utils/listBooks";
import { listScienceFictionBooks } from "@/utils/listScienceFiction";
import { listTIBooks } from "@/utils/listTIBooks";

const listaDosGeneros = [
    {
        id: 1,
        genero: 'Tudo',
        lista: listBooks,
    },
    {
        id: 2,
        genero: 'Ficção cientifica',
        lista: listScienceFictionBooks
    },
    {
        id: 3,
        genero: 'Computação',
        lista: listTIBooks
    },
]

export function Discover(){

    const [clickButtonSearch, setClickButtonSearch] = useState(false)
    const [genderSelected, setGenderSelected] = useState('Tudo')
    
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
            id: 'Ficção cientifica',
            label: 'Ficção cientifica',
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

    
    return(
        <div className=" flex flex-col w-[75rem] xxl:w-[80rem]" key={genderSelected}> {/* Forçando o componente ser desmotado e remontado sempre que trocar de genero*/ }

            <div className="flex items-center justify-between">

                <div className="flex gap-3 items-center">
                    <Binoculars className="text-green-100" size={32}/>
                    <h1>Explorar</h1>
                </div>
                
                <div className=" w-[28.75rem] h-12 ">
                    <InputSearchBook
                        setButtonClicked={setClickButtonSearch}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-10 mb-12 ml-10">
                {buttons.map(({id, label})=> (
                    <button 
                        key={id}
                        className={`${genderSelected === id ? 'text-gray-100 bg-purple-200' : 'border-purple-100 text-purple-100 border'} px-4 py-1 rounded-full`}
                        onClick={() => setGenderSelected(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-3 w-[69rem] gap-5">

                {listaDosGeneros.find(item => item.genero === genderSelected)?.lista.map(({title, author, cover, rating, id }) => (
                    <div className="" key={id}>
                        <PopularBooks
                        key={id}
                        imgBook={cover}
                        alt={`Capa livro ${title}`}
                        title={title}
                        author={author}
                        rating={rating}
                        index={id}
                        width={108}
                        height={152}
                        />
                    </div>))
                }
            </div>
        </div>
    )
}