import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await requireAuth(['SUPER_ADMIN', 'ADMIN', 'MANAGER']);
    const products = await prisma.product.findMany({
      include: { category: true, images: true, variants: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ADMIN']);
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        sku: body.sku,
        price: parseFloat(body.price),
        compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
        stock: parseInt(body.stock, 10),
        categoryId: body.categoryId,
        isPublished: body.isPublished ?? true,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erreur lors de la création du produit' }, { status: 500 });
  }
}
