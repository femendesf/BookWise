import axios from 'axios'

interface CreateReviewParams {
  bookId: string
  title: string
  author: string
  sinopse: string
  imgCover: string
  rating: number
  comment: string
  userId: string
  userAvatar: string
  category: string
  pages: number
}

export async function createReview(data: CreateReviewParams) {
  console.log('DADOS NO CREATE REVIEW', data)
  const response = await axios.post('/api/user/reviews/reviewedBooks', data)
 
  return response.data
}

export async function getReviewsBook(bookId: string) {
  const response = await axios.get(`/api/user/reviews/reviewedBooks?bookId=${bookId}`)
  return response.data
}

export async function getRecentReviews() {
  console.log('DADOS NO GET RECENT REVIEWS')
  const response = await axios.get('/api/user/reviews/recentReviews')
  return response.data
}