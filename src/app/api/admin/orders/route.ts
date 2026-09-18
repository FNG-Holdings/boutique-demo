import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await requireAuth(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT']);
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ADMIN', 'MANAGER']);
    const { orderId, status } = await request.json();

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json(updatedOrder);
  } catch {
    return NextResponse.json({ error: 'Mise à jour échouée' }, { status: 500 });
  }
}
