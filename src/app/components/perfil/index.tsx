import { MagnifyingGlass, Star, User } from "@phosphor-icons/react";
import { MyBooks } from "./components/MyBooks";
import { MyProfile } from "./components/MyProfile";
import EntendendoAlgoritmo from '../../../public/assets/livrosAlgoritmos.svg'

export function Profile() {

    const imgUrl = EntendendoAlgoritmo.src;

    return(
        <div className="flex gap-16"> 

            <div>
                <h1 className="flex items-center gap-3 ">
                    <User className="text-green-100" size={32}/> 
                    Perfil
                </h1>

                <div className="flex items-center justify-between gap-3 h-12 border border-gray-500 rounded-md px-5 mt-10"> {/* Search bar */}

                    <input className="text-gray-400 focus:outline-none text-sm bg-transparent w-full " type="text" placeholder="Buscar livro avaliado"/>

                    <button className="text-gray-500 hover:text-gray-400"> 
                        <MagnifyingGlass  size={20} />
                    </button>

                </div>
            
                <MyBooks title="Entendendo Algoritmos" author="Aditya Bhargava" img={imgUrl} rating={4} description="Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam. Mollis et luctus amet sed convallis varius massa sagittis.
Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer pellentesque."/>

            </div>

            <MyProfile/>


        </div>
    )
}