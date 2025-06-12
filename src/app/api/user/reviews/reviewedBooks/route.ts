import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const session = await getServerSession(buildNextAuthOptions())
       
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    // const userId = session.user.id;
    const body = await req.json();
    
    const { 
        title, 
        author, 
        description,
        imgCover, 
        rating, 
        comment, 
        category, 
        pages, 
        sinopse,
        bookId,
        userId,
        userAvatar,
       // Renomeamos 'id' do body para 'googleBookId' para clareza
    } = body;

    console.log("Dados recebidos:", body);
    
    if (!bookId || !title || !author || !imgCover || rating === undefined || !comment || !category) {
        return NextResponse.json({ error: 'Dados incompletos para a avaliação. Faltando ID do Google Books, título, autor, capa, rating, comentário ou categoria.' }, { status: 400 });
    }
    const categoryString = typeof category === 'string' ? category : ''; 

    try {
      console.log('ENTROU NO TRY')
      // Verifica se o livro já existe
      let book = await prisma.book.findFirst({
        where: { bookId: bookId}
      });

      if (!book) {
            // Se o livro não existe, cria um novo
            console.log('LIVRO NÃO EXISTE')
            book = await prisma.book.create({
                data: {
                    bookId : bookId, // <--- SALVAMOS O bookId DA API GOOGLE BOOKS
                    title,
                    author,
                    description,
                    sinopse, 
                    coverUrl: imgCover,
                    pages: pages || 0, 
                    category: categoryString,
                    rating: rating, // Rating inicial pode ser a primeira avaliação
                }
            });
        } else {
          console.log('LIVRO EXISTE')
            // Se o livro já existe, você pode querer atualizar suas propriedades
            // Mantenha o book_id, mas atualize outros campos se necessário.
            await prisma.book.update({
                where: { id: book.id }, // Atualiza pelo ID interno do Prisma
                data: {
                    title: title, // Você pode querer atualizar título, autor, etc. caso haja mudanças
                    author: author,
                    sinopse,
                    coverUrl: imgCover,
                    category: categoryString,
                    pages: pages || book.pages || 0,
                    // O rating do livro será atualizado após a review ser criada
                },
            });
        }

      // 2. Criar a avaliação
      console.log('CRIANDO REVIEW')
      const newReview = await prisma.review.create({
        data: {
          comment: comment,
          rating: rating,
          user: {
            connect: { id: userId},
          },
          book: {
            connect: { id: book.id },// Conecta ao livro encontrado/criado no SEU DB
          },
        },
        include: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
            },
          },
        },
      });
      
      // 3. Atualizar o rating médio do livro (opcional, mas recomendado)
      // const reviews = await prisma.review.findMany({
      //   where: { bookId: book.id },
      //   select: { rating: true },
      // });

      // const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      // const averageRating = totalRating / reviews.length;

      // await prisma.book.update({
      //   where: { id: book.id },
      //   data: { rating: averageRating },
      // });
        
        return NextResponse.json(newReview, { status: 201 });

      } catch (error:any) {
          if (error && error.code && error.meta) {
            // Este bloco tenta criar um JSON.stringify de um objeto com meta e code.
            // Se o payload para NextResponse.json for um objeto, stringify pode ser problemático.
            // NextResponse.json espera um objeto serializável.
            return NextResponse.json({
                message: 'Erro Prisma',
                code: error.code,
                meta: error.meta,
            }, { status: 400 }); // Removido o new NextResponse(JSON.stringify(...)) para usar NextResponse.json
          }
          console.error("Erro ao criar avaliação:", error);
        return NextResponse.json({ error: 'Erro ao criar avaliação' }, { status: 500 });
      }
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const googleBookId  = searchParams.get('bookId');

    if (!googleBookId ) {
      return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
    }

    const book = await prisma.book.findFirst({
        where: { bookId: googleBookId }, // <--- Uses Google Book ID (not unique)
        select: { id: true } // Selects the internal Prisma ID
    });

    if (!book) {
        return NextResponse.json([], { status: 200 }); // Returns empty array if book not found
    }

    const reviews = await prisma.review.findMany({
      where: { bookId: book.id }, // Uses the internal Prisma ID to find reviews
      include: {
        user: {
          select: {
            name: true,
            avatarUrl: true,
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
        createdAt: 'desc',
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
  }
}