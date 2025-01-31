import { BookmarkSimple, BookOpen, Books, UserList } from "@phosphor-icons/react";
import Avatar from "../../../../public/assets/rick.jpg";
import { PhotoProfile } from "../../PhotoProfile";


export function MyProfile(){

    const imageUrl = Avatar.src;

    return(
        <div className="flex flex-col items-center gap-10 border-l-[1px] border-gray-700 w-[19.25rem] h-[34.75rem]">

            <div className="flex flex-col items-center gap-5">

                <PhotoProfile imageUrl={imageUrl} size="4.5rem" width={76} height={76}/>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-xl text-gray-100">Felipe Mendes Fosneca</span>
                    <h3>membro desde 2025</h3>

                    <div className="w-[32px] h-[4px] bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] rounded-full mt-9"></div>
                </div>

            </div>

             <div className="flex flex-col gap-10">

                <div className="flex gap-5 items-center">
                    <BookOpen className="text-green-100" size={32}/>
                    <div>
                        <h4 className="text-gray-200 text-base">853</h4>
                        <span className="text-gray-300 text-sm">Páginas lidas</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <Books className="text-green-100" size={32}/>
                    <div>
                        <h4 className="text-gray-200 text-base">3</h4>
                        <span className="text-gray-300 text-sm">Livros avaliados</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <UserList className="text-green-100" size={32}/>
                    <div>
                        <h4 className="text-gray-200 text-base">3</h4>
                        <span className="text-gray-300 text-sm">Autores lidos</span>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <BookmarkSimple className="text-green-100" size={32}/>
                    <div>
                        <h4 className="text-gray-200 text-base">Horror</h4>
                        <span className="text-gray-300 text-sm">Categoria mais lida</span>
                    </div>
                </div>

             </div>
        </div>
    )
}