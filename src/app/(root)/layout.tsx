import type { Metadata } from 'next';

import { Header } from '@/components/shared/header';

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
	description: 'Выберите любимую пиццу и оформите заказ онлайн на Next Pizza.',
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen bg-white'>
			<Header hasSearch />
			{children}
			{modal}
		</main>
	);
}
