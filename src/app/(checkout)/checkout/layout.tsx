import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Оформление заказа',
	description: 'Введите данные для доставки и завершите оформление заказа.',
};

export default function CheckoutSectionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
