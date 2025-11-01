import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Pizza | Профиль',
	description: 'Управляйте настройками профиля на Next Pizza.',
};

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
