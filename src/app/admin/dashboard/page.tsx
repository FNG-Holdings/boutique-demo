import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  // Vérification de l'accès Admin
  await requireAuth(['SUPER_ADMIN', 'ADMIN', 'MANAGER']);

  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  const pendingOrders = await prisma.order.count({ where: { status: 'PENDING' } });

  return (
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold">Tableau de bord — FNG Beauty</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Produits en catalogue</p>
          <p class="text-3xl font-extrabold mt-1">{totalProducts}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Total Commandes</p>
          <p class="text-3xl font-extrabold mt-1">{totalOrders}</p>
        </div>
        <div class="bg-white p-4 rounded-xl shadow border">
          <p class="text-gray-500 text-sm">Commandes en attente</p>
          <p class="text-3xl font-extrabold text-amber-600 mt-1">{pendingOrders}</p>
        </div>
      </div>
    </div>
  );
}
