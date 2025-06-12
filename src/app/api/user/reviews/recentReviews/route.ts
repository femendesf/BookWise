import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recentReviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc', // Ordena pelas mais recentes
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
          },
        },
        book: {
          select: {
            bookId: true,
            title: true,
            author: true,
            coverUrl: true,
            category: true,
            sinopse: true
          },
        },
      },
    });

    const formattedReviews = recentReviews.map(review => ({
      ...review,
      book: {
        ...review.book,
        category: review.book?.category ?? '',
      }
    }));

    return NextResponse.json(formattedReviews, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar reviews recentes:', error);
    return NextResponse.json({ message: 'Erro interno ao buscar avaliações recentes' }, { status: 500 });
  }
}