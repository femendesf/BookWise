'use client'
import {ChartLineUp } from "@phosphor-icons/react";
import { RecentReviews } from "./components/RecentReviews";
import { PopularBooks } from "./components/PopularBooks";
import { LastReading } from "./components/LastReading";


export function Inicio(){

    return(
        <div id="inicio" className="flex justify-between">

            <div className="flex flex-col gap-10 mb-1">

                <h1 className="text-gray-100 flex text-2xl gap-3">
                   <ChartLineUp size={32} className="text-green-100"/>
                    Início
                </h1>

               <LastReading />

                <div>
                    <h2 className="text-gray-100 text-sm">Avaliações mais recentes</h2>
                    <RecentReviews />
                    <RecentReviews />
                    <RecentReviews />
                </div>

            </div>
            
            <PopularBooks />
           
        </div>
    )

}