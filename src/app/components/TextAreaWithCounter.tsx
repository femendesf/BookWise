import { useState } from "react";

export function TextAreaWithCounter() {
  const [text, setText] = useState("");
  const maxChars = 450;

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
        onChange={(e) => setText(e.target.value)}
      />
      
      {/* Contador de caracteres */}
      <span className="absolute bottom-2 right-3 text-xs text-gray-400">
        {text.length} / {maxChars}
      </span>
    </div>
  );
}
