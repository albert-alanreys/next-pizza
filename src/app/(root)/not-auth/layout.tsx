import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Доступ запрещён',
	description: 'Эта страница доступна только авторизованным пользователям.',
};

export default function NotAuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
