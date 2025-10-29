'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';

import { IProduct } from '@/hooks/use-choose-pizza';

import { ChoosePizzaForm } from '../choose-pizza-form';
import { ChooseProductForm } from '../choose-product-form';

interface Props {
	product: IProduct;
}

export const ChooseProductModal: React.FC<Props> = ({ product }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType);

	const onCloseModal = () => {
		router.back();
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
			<DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
				<DialogTitle>
					<VisuallyHidden>{product.name}</VisuallyHidden>
				</DialogTitle>
				<DialogDescription>
					<VisuallyHidden>
						{isPizzaForm
							? 'Выберите ингредиенты и добавьте пиццу в корзину.'
							: 'Выберите продукт и добавьте его в корзину.'}
					</VisuallyHidden>
				</DialogDescription>

				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						items={product.items}
						onClickAdd={onCloseModal}
						ingredients={product.ingredients}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						items={product.items}
						onClickAdd={onCloseModal}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
