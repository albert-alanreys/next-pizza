import type { Metadata } from 'next';

import { Header } from '@/components/shared';

export const metadata: Metadata = {
	title: 'Next Pizza',
};

export default async function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<Header hasCart={false} hasSearch={false} className='border-gray-200' />
			{children}
		</main>
	);
}
