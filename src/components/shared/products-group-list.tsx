'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/store/category';

import { cn } from '@/lib/utils';

import { CategoryProducts } from '@/@types/prisma';

import { ProductCard } from './product-card';
import { Title } from './title';

interface Props {
	title: string;
	products: CategoryProducts['products'];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	products,
	categoryId,
	listClassName,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef<HTMLDivElement | null>(null);
	const intersection = useIntersection(
		intersectionRef as React.RefObject<HTMLDivElement>,
		{ threshold: 0.4 },
	);

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [intersection?.isIntersecting]);

	return (
		<div className={className} id={title}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div
				ref={intersectionRef}
				className={cn('grid grid-cols-3 gap-[50px]', listClassName)}
			>
				{products
					.filter((product) => product.items.length > 0)
					.map((product) => {
						return (
							<ProductCard
								key={product.id}
								id={product.id}
								name={product.name}
								imageUrl={product.imageUrl}
								price={Math.min(
									...Array.from(product.items, (item) => item.price),
								)}
								ingredients={product.ingredients}
							/>
						);
					})}
			</div>
		</div>
	);
};
