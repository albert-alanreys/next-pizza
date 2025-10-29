import { notFound } from 'next/navigation';

import { Container } from '@/components/shared/container';
import { ProductsGroupList } from '@/components/shared/products-group-list';

import { ChoosePizzaForm } from '@/components/shared';

import { prisma } from '@/lib/prisma';

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const resolved = await params;
	const id = Number(resolved.id);

	if (!id || isNaN(Number(id))) {
		return notFound();
	}

	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
							ingredients: true,
						},
					},
				},
			},
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

	return (
		<Container className='flex flex-col my-10'>
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				items={product.items}
				ingredients={product.ingredients}
			/>

			<ProductsGroupList
				className='mt-20'
				listClassName='grid-cols-4'
				key={product.category.id}
				title='Рекомендации'
				products={product.category.products}
				categoryId={product.category.id}
			/>
		</Container>
	);
}
