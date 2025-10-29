import React from 'react';

import { PizzaSizeItem, pizzaTypes } from '@/lib/pizza-details-to-text';
import { cn } from '@/lib/utils';

import { GroupVariants } from './group-variants';

interface Props {
	pizzaSizes: PizzaSizeItem[];

	selectedSize?: string;
	onClickSize: (value: string) => void;

	selectedPizzaType?: string;
	onClickPizzaType: (value: string) => void;

	className?: string;
}

export const PizzaSelector: React.FC<Props> = ({
	pizzaSizes,
	selectedSize = '20',
	selectedPizzaType = '1',
	onClickSize,
	onClickPizzaType,
	className,
}) => {
	return (
		<div className={cn('flex flex-col gap-3 mt-5 mb-8', className)}>
			<GroupVariants
				defaultValue='20'
				items={pizzaSizes}
				onClick={onClickSize}
				selectedValue={selectedSize}
			/>

			<GroupVariants
				defaultValue='1'
				items={pizzaTypes}
				onClick={onClickPizzaType}
				selectedValue={selectedPizzaType}
			/>
		</div>
	);
};
