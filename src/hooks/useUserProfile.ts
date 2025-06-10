import { categoryTranslations } from "@/utils/categoriesTranslated";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export function useUserProfile(permissionGoogleBookAccepted: boolean | null, session: any) {
 
    return useQuery({
        queryKey: ['userProfile', permissionGoogleBookAccepted],
        queryFn: async () => {
            const createdRes = await axios.get('/api/user/created_at');
            const createdAt = dayjs(createdRes.data.user.created_at).year().toString();

            if(!permissionGoogleBookAccepted){
                return {
                    createdAt,
                    bookItems: [],
                    totPagesRead: 0,
                    categoryMoreRead: '',
                    uniqueAuthors: []
                }
            }

            const booksReadRes = await axios.get('/api/user/booksRead');
            const books = booksReadRes.data.books || [];

            if(books.length === 0) {
                return {
                    createdAt,
                    bookItems: [],
                    totPagesRead: 0,
                    categoryMoreRead: '',
                    uniqueAuthors: []
                }
            }

            let totPages = 0;
            const authorsSet = new Set<string>();
            const categoryCount: Record<string, number> = {};

            books.forEach((book: any) => {
                totPages += book.pages || 0;

                if(Array.isArray(book.author)) {
                    book.author.forEach((a: string) => authorsSet.add(a));
                } // ← Adiciona os autores ao Set

                if(Array.isArray(book.categories)) {
                    book.categories.forEach((category: string) => {
                        const matchedKey = Object.keys(categoryTranslations).find(key => category.toLowerCase().includes(key.toLowerCase())); // ← Encontra a chave correspondente na tradução
                        const translated = matchedKey ? categoryTranslations[matchedKey] : category; // ← Traduz a categoria
                        categoryCount[translated] = (categoryCount[translated] || 0) + 1; // ← Incrementa a contagem da categoria
                    })
                } // ← Percorre as categorias e incrementa a contagem
            })

            const mostReadCategory = Object.entries(categoryCount).reduce((a,b) => (b[1] > a[1] ? b : a), ["", 0])[0]; // ← Encontra a categoria mais lida

            return {
                createdAt,
                bookItems: books,
                totPagesRead: totPages,
                categoryMoreRead: mostReadCategory,
                uniqueAuthors: Array.from(authorsSet) // ← Converte o Set de autores em um array
            };
        },
        enabled: typeof permissionGoogleBookAccepted === 'boolean' && session !== null,
        
    })
}