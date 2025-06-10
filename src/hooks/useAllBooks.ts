import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAllBooks(){
    return useQuery ({
        queryKey: ['allBooks'],
        queryFn: async () => {
            const {data} = await axios.get('/api/books?q=&subject=');
            return data
        },
        staleTime: 1000 * 60 * 10, // 10 minutes
    })
}