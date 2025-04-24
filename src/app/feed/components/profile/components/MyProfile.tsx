import { BookmarkSimple, BookOpen, Books, UserList } from "@phosphor-icons/react";
import { PhotoProfile } from "../../../../components/PhotoProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Session } from "next-auth";
import axios from "axios";

type MyProfileProps ={session: Session | null}
export function MyProfile({session}: MyProfileProps){

    const { data: sessionData } = useSession();
   
    const avatar_url = session?.user?.avatar_url || sessionData?.user?.avatar_url || "/default-avatar.png"; // Avatar padrão caso session seja null
    const name = session?.user?.name || sessionData?.user?.name || "Convidado"; // Nome padrão para usuários não autenticados
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    
    const [bookItems, setBookItems] = useState<any[]>([]);
    const [totPagesRead, setTotPagesRead] = useState(0);
    const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([])
    const [categoryMoreRead, setCategoryMoreRead] = useState<string | null>(null);

    

    useEffect(() => {

        const fetchUserData = async () => {
          try {
            const [createdAtRes, bookReadRes] = await Promise.all([
                axios.get('/api/user/created_at'),
                axios.get('/api/user/booksRead')
            ]);
            
            if (createdAtRes.data.createdAt) {
              setCreatedAt(new Date(createdAtRes.data.createdAt));
            }

            const authorsSet = new Set<string>(); // ← Cria um Set para armazenar autores únicos

            if (bookReadRes.data.books) {
                setBookItems(bookReadRes.data.books);

                bookReadRes.data.books.forEach((book: any) => {
                    const volumeInfo = book.volumeInfo;

                    setTotPagesRead((prev) => prev + volumeInfo.pageCount); // Soma as páginas lidas
                    
                    if (volumeInfo.authors && Array.isArray(volumeInfo.authors)) {
                        volumeInfo.authors.forEach((author: string) => {
                          authorsSet.add(author); // ← evita duplicados automaticamente
                        });
                    }
                });
                setUniqueAuthors(Array.from(authorsSet)); // ← salva a lista
                console.log("Livros lidos:", bookReadRes.data.books); // Aqui está o log!
                console.log("Autores LIDOS", uniqueAuthors); // Aqui está o log!
            }

             // Atualiza o estado com o número de autores lidos

          } catch (error) {
            console.error("Erro ao buscar data de criação do usuário", error);
          }
        }; 
    
        fetchUserData();
    }, []);
    
    const year = createdAt?.getFullYear() || "2025"; // fallback padrão
    console.log("Autores LIDOS", uniqueAuthors);
//    console.log("Livros lidos:", bookItems); // Aqui está o log!
//    console.log("Quantidade de paginas lidas:", totPagesRead); // Aqui está o log!
//    console.log("Quantidade de AUTORES lidOs:", totAuthRead); // Aqui está o log!
   
    return(
        <div className="flex flex-col items-center  gap-10 border-l-[1px] border-gray-700 w-[19.25rem] h-[34.75rem]">

            <div className="flex flex-col items-center gap-5">

                <PhotoProfile imageUrl={avatar_url} size="4.5rem"/>

                <div className="flex flex-col items-center gap-1">
                    <span className="items-center justify-center truncate max-w-72 text-xl text-gray-100">{name.split(" ").slice(0, 3).join(" ")}</span>
                    <h3 className="text-gray-400 text-sm">membro desde {year}</h3>

                    <div className="w-[32px] h-[4px] bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] rounded-full mt-9"></div>
                </div>

            </div>

             <div className="flex flex-col gap-10 " id="info-profile">

                <div className="flex gap-5 items-center">
                    <BookOpen size={32}/>
                    <div>
                        <h4>{totPagesRead}</h4>
                        <span>Páginas lidas</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <Books size={32}/>
                    <div>
                        <h4>3</h4>
                        <span>Livros avaliados</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <UserList size={32}/>
                    <div>
                        <h4>{uniqueAuthors.length}</h4>
                        <span>Autores lidos</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <BookmarkSimple size={32}/>
                    <div>
                        <h4>Horror</h4>
                        <span>Categoria mais lida</span>
                    </div>
                </div>

             </div>
        </div>
    )
}