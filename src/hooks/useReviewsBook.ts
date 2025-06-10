// hooks/useReviewsBook.ts
import { useQuery } from '@tanstack/react-query'
import { getReviewsBook } from '@/services/reviews'

export function useReviewsBook(bookId: string) {
  return useQuery({
    queryKey: ['reviewsBook', bookId],
    queryFn: () => getReviewsBook(bookId),
    enabled: !!bookId, // só faz a query se o bookId estiver definido
  })
}
