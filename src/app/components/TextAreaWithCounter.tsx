import React, { useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  text: z.string().min(3, 'Avaliação precisa ter pelo menos 3 caracteres')
})

interface TextAreaWithCounterProps{
  setSendComment: (send: boolean) => void,
  setTextComment: (text: string) => void,
}

export function TextAreaWithCounter({setSendComment, setTextComment} : TextAreaWithCounterProps) {
  
  const [text, setText] = useState("");
  const [error, setError] = useState('')
  const maxChars = 450;

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    const value = e.target.value
    setText(value)

    const result = searchSchema.safeParse({text: value})

    if(!result.success){
      setError(result.error.errors[0].message)
      setSendComment(false)

    }else{
      console.log(`Erro TextArea: ${error}`)
      setTextComment!(value)
      setSendComment(true)
      setError('')
    }
  } // Função para verificar se o texto tem mais de 3 caracteres

  return (
    <div className="relative w-full">
      <textarea
        className="
          h-[164px] w-full border 
          p-2 rounded-md resize-none bg-gray-800 border-gray-500 
          focus:outline-none focus:ring-1 focus:ring-green-100 
          text-sm text-gray-200 py-[1.14rem] px-5
        "
        maxLength={maxChars}
        placeholder="Escreva sua avaliação"
        value={text}
        onChange={handleTextChange}
      />
      
      {/* Contador de caracteres */}
      <span className="absolute bottom-2 right-3 text-xs text-gray-400">
        {text.length} / {maxChars}
      </span>

      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
