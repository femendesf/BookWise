import axios from "axios";
import { console } from "inspector";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const category = searchParams.get('subject');
    
    const API_URL = query ? `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}+intitle:${query}&orderBy=relevance&printType=books&maxResults=15&langRestrict=pt&key=${process.env.GOOGLE_BOOKS_API_KEY}` : `https://www.googleapis.com/books/v1/volumes?q=${query}+subject:${category}&orderBy=relevance&printType=books&maxResults=15&langRestrict=pt&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    try {
        const {data} = await axios.get(API_URL);
        
        const books = data.items?.map((item: any) => {
            
            console.log("*************** ITEM COMPLETO ***************");
            console.log(JSON.stringify(item, null, 2));
            console.log("*********************************************");
            
            const categories = item.volumeInfo.categories || [];
           
            return {
                id: item.id,
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors?.join(", ") || "Desconhecido",
                cover: item.volumeInfo.imageLinks?.thumbnail || "/errorCover.svg",
                rating: item.volumeInfo.averageRating || 0,
                sinopse: item.volumeInfo.description || "Descrição não disponível",
                description: {
                    category: categories,
                    pages: item.volumeInfo.pageCount || 0,
                },
            };
        }) || [];
        
        return NextResponse.json(books);
        
    } catch (error) {
        console.error("Erro ao buscar livros do Google Books:", error);
        return NextResponse.json({
            error: 'Erro ao buscar livros do Google Books'
        }, {
            status: 500
        })
    }
}
