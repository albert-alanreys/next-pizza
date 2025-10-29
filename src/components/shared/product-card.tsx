'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { Title } from './title';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl?: string;
	ingredients?: Array<{ name: string; id: number }>;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	const ingredientsText =
		ingredients?.map((ingredient) => ingredient.name).join(', ') || '';

	return (
		<div className={cn(className)}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img className='w-[215px] h-[215px]' src={imageUrl} alt='Logo' />
				</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-gray-400'>{ingredientsText || ''}</p>

				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price} ₽</b>
					</span>

					<Button variant='secondary' className='text-base font-bold'>
						<Plus className='w-5 h-5 mr-1' />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};
