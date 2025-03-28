import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if(!query) {
        return NextResponse.json({
            error: 'Paramentro de busca não informado'
        }, {
            status: 400
        })
    }

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=15&langRestrict=pt&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    try {
        const {data} = await axios.get(API_URL);

        console.log(data)
        
        const books = data.items?.map((item: any) => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors?.join(", ") || "Desconhecido",
            cover: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.jpg",
            rating: item.volumeInfo.averageRating || 0,
            description: {
                category: item.volumeInfo.categories 
                ? item.volumeInfo.categories.map((cat: string) => (typeof cat === "string" ? cat.toLowerCase() : "")) 
                : [],
                pages: item.volumeInfo.pageCount || 0,
            },
        })) || []

        
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
