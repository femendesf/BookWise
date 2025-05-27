import { BookmarkSimple, BookOpen, X } from '@phosphor-icons/react'

import Avatar from '../../../public/assets/rick.jpg'
import { useEffect, useRef, useState } from "react"

import { listComments as initialComments } from '@/utils/listComments'
import { CardBook } from '../CardBook';

import { SendReview } from './components/SendReview';

import { BoxLogin } from '../BoxLogin';
import { ReviewUser } from '../ReviewUser';
import axios from 'axios';

interface SidePanelProps{
    nameUser: string;
    imgAvatar: string;

    id: string;
    title: string;
    author: string;
    imgCover: string;
    rating: number;
    index: number;
    category: string[];
    pages: number;

    isAuthenticated: boolean;
    clickedExitBook: (clicked: boolean) => void;
}


export function SidePanel({imgCover, title, author, rating, index, category, pages, isAuthenticated, nameUser, imgAvatar, clickedExitBook} : SidePanelProps){
    
    // const [sendComment, setSendComment] = useState(false)
    const [reviewButton, setReviewButton] = useState(false)
    const [comments, setComments] = useState<any[]>([]);
    const [showLogin, setShowLogin] = useState(false)//Estado para mostrar o login
    const panelRef = useRef<HTMLDivElement>(null)// Criando uma referência para o painel

    const [bookId, setBookId] = useState<string | null>(null); // Estado para armazenar o ID do livro do DB

    const fetchBookAndReviews = async () => {
        try {
            // Primeiro, vamos tentar obter o ID do livro do backend.
            // Poderíamos ter uma rota GET /api/books?title=X&author=Y
            const bookResponse = await axios.get('/api/books', {
                params: { title, author }
            });

            let currentBookId = bookResponse.data?.id;

            if (!currentBookId) {
                // Se o livro não existe, podemos criá-lo aqui ou deixar a rota de review fazer isso
                // Por agora, vamos assumir que a rota de review vai lidar com a criação do livro.
                // Mas para buscar avaliações, precisamos de um bookId.
                // Uma alternativa seria criar o livro aqui se ele não existir
                // ou passar os dados do livro para a rota de review e deixar ela lidar com a criação.
                // Por simplicidade, vamos passar o bookId como null inicialmente e deixar a rota POST /reviewdBooks criar/encontrar o livro.
            } else {
                setBookId(currentBookId);
                // Se o livro existe, busque as avaliações
                const reviewsResponse = await axios.get(`/api/user/reviewedBooks?bookId=${currentBookId}`);
                setComments(reviewsResponse.data);
            }
        } catch (error) {
            console.error('Erro ao buscar livro ou avaliações:', error);
            // setComments(initialComments); // Fallback para comentários iniciais se houver um erro
        }
    };


    async function handleNewComment(commentData: { avatar: string, nameUser: string, comment: string, rating: number }) {
        
        const categoriesArray: string[] = category || []; // Garante que é um array, mesmo que vazio
        const categoriesString = categoriesArray.join(', '); // Converte o array em uma string separada por vírgulas
        try {
            const response = await axios.post('/api/user/reviewedBooks', {
                title: title,
                author: author,
                imgCover: imgCover,
                rating: commentData.rating,
                comment: commentData.comment,
                category: categoriesString,
                
            });

            // Atualize o estado local dos comentários com o novo comentário vindo do banco de dados
            // O comentário retornado pelo backend já deve ter as informações do usuário.
            setComments((prevComments) => [response.data, ...prevComments]);
            setReviewButton(false); // Fechar o formulário de avaliação após o envio

        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            // Lide com o erro, talvez mostrando uma mensagem ao usuário
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return() => {
            document.body.style.overflow = ''
        }
    },[]) // Para tirar a barra de rolagem do body quando componente estiver aberto

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
            clickedExitBook(false); // Fecha o painel
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickedExitBook]); // Adiciona um evento de clique fora do painel para fechá-lo

    return(
        <div className="fixed inset-0 flex bg-black bg-opacity-70 z-50">

            <div ref={panelRef} className="relative flex flex-col bg-gray-800 w-[41.25rem] py-16 px-12 ml-auto max-h-screen overflow-y-auto">

                <button className="absolute top-4 right-4" onClick={() => clickedExitBook(false)}>
                    <X className="text-gray-400 hover:text-gray-300" width={24} height={24}/>
                </button>

                <div className="flex flex-col bg-gray-700 py-6 px-8 rounded-lg gap-10">

                    <CardBook
                        title={title}
                        alt={title}
                        index={index}
                        author={author}
                        imgBook={imgCover}
                        rating={rating}
                        widthAvatar={172}
                        heightAvatar={242}
                        blockedClick
                        sizeStar={20}
                        styleH2='text-gray-100 text-2xl'
                        styleH3='text-gray-400 text-base'
                        category={category}
                        pages={pages}
                    />
                   
                    <div className="flex gap-[3.75rem] border-t-[1px] border-gray-600 py-6"> 

                        <div className="flex gap-4 items-center">
                            <BookmarkSimple className="text-green-100" size={24}/>

                            <div className='w-56'>
                                <span className="text-sm text-gray-300">Categoria</span>
                                <h2 className="text-gray-200 text-base line-clamp-2">{category?.length ? category.join(', ') : ''}</h2>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <BookOpen className="text-green-100" size={24}/>

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-300">Páginas</span>
                                <h2 className="text-gray-200 text-base">{pages || 'N/A'}</h2>
                            </div>
                        </div>
                    </div>

                </div>{/*Card Book*/}

                <div className="flex flex-col mt-10 gap-4  ">

                    <div className="flex justify-between items-center">

                        <h2 className="text-sm text-gray-200">Avaliações</h2>

                        {!reviewButton && 
                            <button 
                                onClick={() => {
                                    if(!isAuthenticated){
                                        setShowLogin(true)
                                        
                                    }else{
                                        setReviewButton(true)
                                       
                                    }
                                 } }

                                className="text-base text-purple-100 hover:text-purple-hoover hover:bg-purple-100 hover:bg-opacity-10 p-1 rounded">
                                Avaliar
                            </button>
                        }
                        
                    </div>

                    {showLogin &&
                        <BoxLogin
                            setCloseLogin={setShowLogin}
                        />
                    }{/*Mostra tela de login se tentar avaliar sem estar logado*/}
                   
                    {reviewButton && 
                        <SendReview
                            imgAvatar={imgAvatar}
                            nameUser={nameUser}
                            rating={0}
                            sizeStarRating={24}
                            setCloseReview={setReviewButton}
                            key={title}
                            handleNewComment={handleNewComment}
                        />
                    }{/*Deixar Avalição*/ }
                    

                    {[...comments].reverse().map((user, key) => (
                        <div className="bg-gray-700 p-5 rounded-lg w-full" id="reviews" key={key}>
                        
                            <ReviewUser
                                imgProfile={user.avatar}
                                nameUser={user.nameUser}
                                when="Hoje"
                                sizeImageUser="2.5rem"
                                rating={user.rating}
                                comment={user.comment}
                            />
                        </div>
                    ))}{/*Comentarios*/ }
                   
                </div>
            </div>
        </div>
    )
}