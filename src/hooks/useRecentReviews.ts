import { getRecentReviews } from "@/services/reviews";
import { useQuery } from "@tanstack/react-query";

export function useRecentReviews() {
    return useQuery({
        queryKey: ['recentReviews'],
        queryFn: getRecentReviews,
        staleTime: 1000 * 60 * 10, // 10 minutos
    })
}