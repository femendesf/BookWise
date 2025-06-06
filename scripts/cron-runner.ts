import { runGoogleBooksPermissionCheck } from '@/cron/runGoogleBooksPermissions';
import cron from 'node-cron';

console.log('⏱️  Cron job iniciado...');

cron.schedule('0 3 * * *', async () => {
  console.log('🔍 Verificando permissões Google Books...');
  await runGoogleBooksPermissionCheck();
});