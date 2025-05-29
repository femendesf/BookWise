import { BookmarkSimple, BookOpen, Books, UserList } from "@phosphor-icons/react";
import { PhotoProfile } from "../../../../components/PhotoProfile";

import { categoryTranslations } from "@/utils/categoriesTranslated";

interface MyProfileProps {
    name: string;
    createdAt?: string;
    avatar_url: string;

    totPagesRead: number;
    reviewedBooks: number;
    totAuthorsRead: number;
    categoryMoreRead: string | null;
}
export function MyProfile({name, createdAt, avatar_url, totPagesRead, reviewedBooks, totAuthorsRead, categoryMoreRead}: MyProfileProps){

    return(
        <div className="flex flex-col items-center  gap-10 border-l-[1px] border-gray-700 w-[19.25rem] h-[34.75rem]">

            <div className="flex flex-col items-center gap-5">

                <PhotoProfile imageUrl={avatar_url} size="4.5rem"/>

                <div className="flex flex-col items-center gap-1">
                    <span className="items-center justify-center truncate max-w-72 text-xl text-gray-100">{name.split(" ").slice(0, 3).join(" ")}</span>
                    <h3 className="text-gray-400 text-sm">membro desde {createdAt}</h3>

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
                        <h4>{reviewedBooks}</h4>
                        <span>Livros avaliados</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <UserList size={32}/>
                    <div>
                        <h4>{totAuthorsRead}</h4>
                        <span>Autores lidos</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <BookmarkSimple size={32}/>
                    <div>
                        <h4>{categoryTranslations[categoryMoreRead ?? ""] ?? categoryMoreRead ?? "N/A"}</h4>
                        <span>Categoria mais lida</span>
                    </div>
                </div>

             </div>
        </div>
    )
}