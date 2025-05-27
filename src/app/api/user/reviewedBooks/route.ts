import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {

    const session = await getServerSession(buildNextAuthOptions())
       
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    const userId = session.user.id; // Obter o ID do usuário autenticado

    try {
    const body = await req.json();
    const { title, author, imgCover, rating, comment, category  } = body; // Inclua userId na requisição do frontend

    
    // 1. Encontrar ou criar o livro
    let book = await prisma.book.findUnique({
      where: { title_author: { title: title, author: author } }, // Adicionar unique constraint no Prisma para title e author
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          title: title,
          author: author,
          cover_url: imgCover,
          rating: rating,
          category: category, // <-- SALVANDO A STRING DIRETAMENTE
          pages: 0, // Ajuste conforme necessário
        },
      });
    } else {
      // Se o livro já existe e você quer atualizar as categorias, faça isso aqui
      // Por exemplo, você pode querer sobrescrever as categorias existentes
      await prisma.book.update({
        where: { id: book.id },
        data: {
          category: category, // Atualiza a string de categoria
        },
      });
    }

    // 2. Criar a avaliação
    const newReview = await prisma.review.create({
      data: {
        comment: comment,
        rating: rating,
        user: {
          connect: { id: userId },
        },
        book: {
          connect: { id: book.id },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            avatar_url: true,
          },
        },
      },
    });

    // 3. Atualizar o rating médio do livro (opcional, mas recomendado)
    const reviews = await prisma.review.findMany({
      where: { book_id: book.id },
      select: { rating: true },
    });

    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    await prisma.book.update({
      where: { id: book.id },
      data: { rating: averageRating },
    });


    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Rota para buscar avaliações de um livro específico
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { book_id: bookId },
      include: {
        user: {
          select: {
            name: true,
            avatar_url: true,
          },
        },
        book: { // Inclua os dados do livro
          select: {
            category: true, // Certifique-se de selecionar o campo 'category'
            // ... outros campos do livro que você precisa
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    const formattedReviews = reviews.map(review => ({
      ...review,
      // Certifique-se de que review.book existe antes de tentar acessar review.book.category
      // E que review.book.category não seja undefined ou null aqui se não for o caso.
      book: {
        ...review.book,
        // Garanta que `category` seja uma string antes de passar para o frontend se você estiver reformatando aqui
        category: review.book?.category ?? '', // Ou apenas passe como vem do DB e trate no frontend
      }
    }));
   return NextResponse.json(formattedReviews, { status: 200 });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}