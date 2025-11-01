import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Продукт',
	description:
		'Выберите готовый продукт или соберите свою пиццу с любимыми ингредиентами прямо на странице товара.',
};

export default function ProductLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
