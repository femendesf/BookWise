import GeorgeOrwell from '../public/assets/livroGeorge.svg'
import ZenoRocha from '../public/assets/14habitos.png'
import Isaac from '../public/assets/oFimDaEternidade.svg'
import Aditya from '../public/assets/livrosAlgoritmos.svg'
import RobertCodigoLimpo from '../public/assets/codigo-limpo.svg'
import Charles from '../public/assets/o-poder-do-habito.svg'
import RobertArquiteturaLimpa from '../public/assets/arquitetura-limpa.svg'
import Tolkien from '../public/assets/hobbit.svg'
import Edgar from '../public/assets/historias-extraordinarias.svg'
import Martin from '../public/assets/refatoracao.svg'
import Eric from '../public/assets/domain-driven-design.svg'
import Julio from '../public/assets/viagem-ao-centro-da-terra.svg'
import Douglas from '../public/assets/o-guia-do-mochileiro.png'
import Junji from '../public/assets/fragmentosDoHorror.png'
import Andrew from '../public/assets/o-programador-pragmatico.svg'

export const listBooks = [
    {
        id: 1,
        title: 'A revolução dos bichos',
        author: 'George Orwell',
        cover: GeorgeOrwell,
        rating: 4,
        description: {
            category: ['Ficção Científica'],
            pages: 160
        }
    },
    {
        id: 2,
        title: '14 Hábitos de Desenvolvedor Altamente Produtivos',
        author: 'Zeno Rocha',
        cover: ZenoRocha,
        rating: 4,
        description: {
            category: ['Computação,', 'Educação'],
            pages: 160
        }
    },
    {
        id: 3,
        title: 'O fim da eternidade',
        author: 'Isaac Asimov',
        cover: Isaac,
        rating: 4,
        description: {
            category: ['Ficção Científica', 'Fantasia'],
            pages: 160
        }
        
    },
    {
        id: 4,
        title: 'Entendendo Algoritmos',
        author: 'Aditya Y. Bhargava',
        cover: Aditya,
        rating: 5,
        description: {
            category: ['Computação', 'Educação'],
            pages: 160
        }
    },
    {
        id: 5,
        title: 'Código limpo',
        author: 'Robert C. Martin',
        cover: RobertCodigoLimpo,
        rating: 4,
        description: {
            category: ['Computação', 'Educação'],
            pages: 160
        }
    },
    {
        id: 6,
        title: 'O poder do hábito',
        author: 'Charles Duhigg',
        cover: Charles,
        rating: 3,
        description: {
            category: ['Educação'],
            pages: 160
        }
    },
    {
        id: 7,
        title: 'Arquitetura limpa',
        author: 'Robert C. Martin',
        cover: RobertArquiteturaLimpa,
        rating: 4,
        description: {
            category: ['Computação', 'Educação'],
            pages: 160
        }
    },
    {
        id: 8,
        title: 'O Hobbit',
        author: 'J.R.R. Tolkien',
        cover: Tolkien,
        rating: 5,
        description: {
            category: ['Fantasia','Ficção Científica'],
            pages: 160
        }
    },
    {
        id: 9,
        title: 'Histórias extraordinárias',
        author: 'Edgar Allan Poe',
        cover: Edgar,
        rating: 4,
        description: {
            category: ['Fantasia','Ficção Científica'],
            pages: 160
        }
    },
    {
        id: 10,
        title: 'Refatoração',
        author: 'Martin Fowler',
        cover: Martin,
        rating: 4,
        description: {
            category: ['Computação', 'Educação'],
            pages: 160
        }
    },
    {
        id: 11,
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        cover: Eric,
        rating: 4,
        description: {
            category: ['Computação'],
            pages: 160
        }
    },
    {
        id: 12,
        title: 'Viagem ao Centro da Terra',
        author: 'Julio Verne',
        cover: Julio,
        rating: 4,
        description: {
            category: ['Fantasia','Ficção Científica'],
            pages: 160
        }
    },
    {
        id: 13,
        title: 'O guia do mochileiro das galáxias',
        author: 'Douglas Adams',
        cover: Douglas,
        rating: 4,
        description: {
            category: ['Fantasia','Ficção Científica'],
            pages: 160
        }
    },
    {
        id: 14,
        title: 'Fragmentos do Horror',
        author: 'Junji Ito',
        cover: Junji,
        rating: 4,
        description: {
            category: ['Fantasia','Ficção Científica', 'Suspense', 'Horror'],
            pages: 160
        }
    },
    {
        id: 15,
        title: 'O Programador Pragmático',
        author: 'Andrew Hunt',
        cover: Andrew,
        rating: 4,
        description: {
            category: ['Computação', 'Educação'],
            pages: 160
        }
    },
    
]