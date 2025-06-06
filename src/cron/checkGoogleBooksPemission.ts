import { prisma } from '@/lib/prisma';
import { getGoogleOAuthToken } from '../lib/google';
import axios from 'axios';

export async function checkGoogleBooksPermission(userId: string) {
  try {

      // 🔍 Verifica se o usuário tem uma conta do Google vinculada
      const googleAccount = await prisma.account.findFirst({
        where: {
          user_id: userId,
          provider: 'google',
        },
      });

      if (!googleAccount) {
        // Se não tem conta Google, marca como false e sai
        await prisma.user.update({
          where: { id: userId },
          data: { hasGoogleBooksPermission: false },
        });
        console.log(`Usuário ${userId} não possui conta do Google vinculada.`);
        return;
      }

      
      const auth = await getGoogleOAuthToken(userId);

      if (!auth) {
        console.error(`Não foi possível obter o token de autenticação para o usuário ${userId}`);
        return;
      }
      const { token } = await auth.getAccessToken();

      const response = await axios.get(
        'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const hasPermission = response.status === 200;

      await prisma.user.update({
        where: { id: userId },
        data: { hasGoogleBooksPermission: hasPermission },
      });

      console.log(`Permissão do Google Books para usuário ${userId}: ${hasPermission}`);
    } catch (error: any) {
      console.error(`Erro verificando permissão Google Books para ${userId}:`, error?.response?.data || error.message);
      await prisma.user.update({
        where: { id: userId },
        data: { hasGoogleBooksPermission: false },
      });
    }
}
