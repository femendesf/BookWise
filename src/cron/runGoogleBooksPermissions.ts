
import { prisma } from '@/lib/prisma';
import { checkGoogleBooksPermission } from './checkGoogleBooksPemission';

export async function runGoogleBooksPermissionCheck() {
  const accounts = await prisma.account.findMany({
    where: { provider: 'google' },
    select: { user_id: true },
  });

  const uniqueUserIds = Array.from(new Set(accounts.map((acc) => acc.user_id)));

  for (const userId of uniqueUserIds) {
    await checkGoogleBooksPermission(userId);
  }

  console.log('Verificação de permissões Google Books concluída.');
}
