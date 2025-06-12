import { createReview } from "@/services/reviews"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useCreateReview(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createReview,
        onSuccess: (data) => {
            // Invalida e atualiza dados locais
            queryClient.invalidateQueries({ queryKey: ['reviewsBook', data.bookId] })
            queryClient.invalidateQueries({ queryKey: ['recentReviews'] })
            queryClient.invalidateQueries({ queryKey: ['reviewsUser'] })
            if (onSuccessCallback) onSuccessCallback()
        },
    })
}