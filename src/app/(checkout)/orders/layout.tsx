import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Мои заказы',
	description: 'Просматривайте историю и статус своих заказов.',
};

export default function OrdersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
