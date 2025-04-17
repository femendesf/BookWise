import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { set } from "zod";

interface inputSearchBook{
    setTextSearch: (text: string) => void;
    placeholder: string;
    textSearch: string;

    isClickable?: boolean; 

    // buttonSearch?: () => void; // Adicionando a propriedade buttonSearch
}

export function InputSearchBook({ placeholder , textSearch, isClickable, setTextSearch} : inputSearchBook){

    const [inputValue, setInputValue] = useState("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){ //Verificar eventos do input
        
        const value = event.target.value;

        !isClickable && setTextSearch(value)

        value === '' && setTextSearch(value)
        
        setInputValue(value)
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) { //Verifica se a tecla pressionada é Enter
        if (event.key === 'Enter') {
           setTextSearch(inputValue)
        }
    }

    function handleButtonSearch(){
        setTextSearch(inputValue)
    }
    
    
    return(
        <div className="flex items-center justify-between w-full h-full px-5 border border-gray-500 rounded-md focus-within:border-green-200 focus-within:text-green-200" id="input-search-book"> {/* Search bar */}
            <input 
                className="text-gray-200 focus:outline-none text-sm bg-transparent w-full"
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Adiciona o evento de tecla pressionada
            />

            {
                isClickable ? (
                    <button className="text-gray-500 focus-within:text-green-200" onClick={() => handleButtonSearch()}>
                        <MagnifyingGlass size={20}/>
                    </button>
                ) : 

                textSearch === '' && (
                    <MagnifyingGlass className={`text-gray-500 focus-within:text-green-200 `} size={20}/>
                )
            }
           

        </div>
    )
}

/*
    OPÇÃO PARA VALIDAR O INPUT COM BOTAO DE PESQUISA


    // import { z } from "zod";

    // const searchSchema = z.object({
    //     query: z.string().min(3, 'Digite pelo menos 3 caracters')
    // })

    // const [error, setError] = useState('')
        
    // const [inputValueValidation, setInputValueValidation] = useState(false)//Estado para validar o valor do input para bloquear o clique


    //Validação com ZOD
    // const result = searchSchema.safeParse({query: value});

    // if(!result.success){
    //     setError(result.error.errors[0].message)
        
    // }else{
        
    //     setError('')
    //     setInputValueValidation(true)
    // }

*/