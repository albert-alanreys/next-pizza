'use client';

import { useCategoryStore } from '@/store/category';

import { cn } from '@/lib/utils';

interface Props {
	className?: string;
}

const categoryItems = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Закуски' },
	{ id: 4, name: 'Коктейли' },
	{ id: 5, name: 'Кофе' },
	{ id: 6, name: 'Напитки' },
	{ id: 7, name: 'Десерты' },
	{ id: 8, name: 'Десерты' },
];

export const Categories: React.FC<Props> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);

	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
		>
			{categoryItems.map((item) => (
				<a
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						item.id === categoryActiveId &&
							'bg-white shadow-md shadow-gray-200 text-primary',
					)}
					href={`/#${item.name}`}
					key={item.id}
				>
					<button>{item.name}</button>
				</a>
			))}
		</div>
	);
};
