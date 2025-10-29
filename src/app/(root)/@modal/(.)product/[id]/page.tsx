import { notFound } from 'next/navigation';

import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';

import { prisma } from '@/lib/prisma';

export default async function PhotoModal({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolved = await params;
	const id = Number(resolved.id);

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					product: {
						include: {
							items: true,
						},
					},
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}
