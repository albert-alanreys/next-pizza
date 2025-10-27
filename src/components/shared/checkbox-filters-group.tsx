'use client';

import { useState } from 'react';

import { Input } from '../ui/input';

import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	searchInputPlaceholder?: string;
	onChange?: (value: string[]) => void;
	defaultValue?: string[];
	className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	onChange,
	defaultValue,
	className,
}) => {
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const filteredItems = items.filter((item) =>
		item.text.toLowerCase().includes(searchValue.toLowerCase()),
	);

	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const onClickCollapseButton = () => {
		setShowAll(!showAll);
		setSearchValue('');
	};

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						className='bg-gray-50 border-none'
						placeholder={searchInputPlaceholder}
						onChange={onChangeSearchInput}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{(showAll
					? filteredItems
					: defaultItems.slice(0, limit) || filteredItems
				).map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={(ids) => console.log(ids)}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={onClickCollapseButton} className='text-primary mt-3'>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	);
};
