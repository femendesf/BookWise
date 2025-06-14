import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Params {
  textSearch: string;
  genreSelected: string;
}

export function useFilteredBooks({ textSearch, genreSelected }: Params) {
  const category = genreSelected === 'Tudo' ? '' : genreSelected;
  const query = textSearch.trim().split(/\s+/).join('+');

  return useQuery({
    queryKey: ['books', { query, category }],
    queryFn: async () => {
      const { data } = await axios.get(`/api/books?q=${query}&subject=${category}`);
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 min
    enabled: true, // ou adicione lógica se quiser evitar chamadas desnecessárias
  });
}
