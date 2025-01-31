import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
    query: z.string().min(3, 'Digite pelo menos 3 caracters')
})


interface inputSearchBook{
    setButtonClicked: (clicked: boolean) => void;
}

export function InputSearchBook({setButtonClicked} : inputSearchBook){

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    
    const [inputValueValidation, setInputValueValidation] = useState(false)//Estado para validar o valor do input para bloquear o clique

    function handleButtonClicked(clicado: boolean){
        setButtonClicked(clicado)
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
            setInputValueValidation(true)
        }
        
    }

    return(
        <div className="flex items-center justify-between w-full h-full px-5 border border-gray-500 rounded-md"> {/* Search bar */}
            <input 
                className="text-gray-400 focus:outline-none text-sm bg-transparent w-full "
                type="text"
                placeholder="Buscar livro avaliado"
                value={query}
                onChange={handlInputChange}
            />

            
            <button 
                className= {`text-gray-500  ${error || inputValueValidation === false ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-gray-400'}`}
                onClick={()=> !error && inputValueValidation && handleButtonClicked(true)}
            > 
                <MagnifyingGlass  size={20}/>
            </button>
        </div>
    )
}