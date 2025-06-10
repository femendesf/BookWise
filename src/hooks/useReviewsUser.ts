import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useReviewsUser(){

    return useQuery({
        queryKey: ['reviewsUser'],
        queryFn: async () => {
            const response = await axios.get('/api/user/reviews/reviewsUser')
            return response.data.length
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}