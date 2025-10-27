import { Input, RangeSlider } from '../ui';

import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { FilterCheckbox } from './filter-checkbox';
import { Title } from './title';

interface Props {
	className?: string;
}

const items = [
	{
		text: 'Сырный соус',
		value: '1',
	},
	{
		text: 'Моцарелла',
		value: '2',
	},
	{
		text: 'Чеснок',
		value: '3',
	},
	{
		text: 'Солёные огурчики',
		value: '4',
	},
	{
		text: 'Красный лук',
		value: '5',
	},
	{
		text: 'Томаты',
		value: '6',
	},
	{
		text: 'Перец',
		value: '7',
	},
	{
		text: 'Грибы',
		value: '8',
	},
	{
		text: 'Курица',
		value: '9',
	},
];

export const Filters: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Можно собирать' value='1' />
				<FilterCheckbox text='Новинки' value='2' />
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input type='number' placeholder='0' min={0} max={1000} />
					<Input type='number' placeholder='1000' min={100} max={1000} />
				</div>
				<RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
			</div>

			<CheckboxFiltersGroup
				title='Ингредиенты'
				className='mt-5'
				limit={5}
				defaultItems={items}
				items={items}
			/>
		</div>
	);
};
