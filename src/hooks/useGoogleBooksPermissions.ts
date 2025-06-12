import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGoogleBooksPermissions(session: any){

    return useQuery({
        queryKey: ['googleBooksPermissions'],
        queryFn: async () => {
            const {data} = await axios.get('/api/user/hasPermission');
            return data.hasGoogleBooksPermission;
        },
        enabled: !!session,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}