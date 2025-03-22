import { BookmarkSimple, BookOpen, Books, UserList } from "@phosphor-icons/react";
import { PhotoProfile } from "../../../../components/PhotoProfile";

interface MyProfileProps{
    avatar_url: string;
    name: string;
}
export function MyProfile({avatar_url, name}: MyProfileProps){

   
    return(
        <div className="flex flex-col items-center  gap-10 border-l-[1px] border-gray-700 w-[19.25rem] h-[34.75rem]">

            <div className="flex flex-col items-center gap-5">

                <PhotoProfile imageUrl={avatar_url} size="4.5rem"/>

                <div className="flex flex-col items-center gap-1">
                    <span className="items-center justify-center truncate max-w-72 text-xl text-gray-100">{name.split(" ").slice(0, 3).join(" ")}</span>
                    <h3 className="text-gray-400 text-sm">membro desde 2025</h3>

                    <div className="w-[32px] h-[4px] bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] rounded-full mt-9"></div>
                </div>

            </div>

             <div className="flex flex-col gap-10 " id="info-profile">

                <div className="flex gap-5 items-center">
                    <BookOpen size={32}/>
                    <div>
                        <h4>853</h4>
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
                        <h4>3</h4>
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