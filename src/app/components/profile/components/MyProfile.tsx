import { BookmarkSimple, BookOpen, Books, UserList } from "@phosphor-icons/react";
import Avatar from "../../../../public/assets/rick.jpg";
import { PhotoProfile } from "../../PhotoProfile";


export function MyProfile(){

    const imageUrl = Avatar.src;

    return(
        <div className="flex flex-col items-center gap-10 border-l-[1px] border-gray-700 w-[19.25rem] h-[34.75rem]">

            <div className="flex flex-col items-center gap-5">

                <PhotoProfile imageUrl={imageUrl} size="4.5rem"/>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-xl text-gray-100">Felipe Mendes Fosneca</span>
                    <h3>membro desde 2025</h3>

                    <div className="w-[32px] h-[4px] bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] rounded-full mt-9"></div>
                </div>

            </div>

             <div className="flex flex-col gap-10" id="info-profile">

                <div>
                    <BookOpen size={32}/>
                    <div>
                        <h4>853</h4>
                        <span>Páginas lidas</span>
                    </div>
                </div>

                <div>
                    <Books size={32}/>
                    <div>
                        <h4>3</h4>
                        <span>Livros avaliados</span>
                    </div>
                </div>

                <div>
                    <UserList size={32}/>
                    <div>
                        <h4>3</h4>
                        <span>Autores lidos</span>
                    </div>
                </div>

                <div>
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