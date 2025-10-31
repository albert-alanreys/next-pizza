import { redirect } from 'next/navigation';

import { ProfileForm } from '@/components/shared';

import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';

export default async function ProfilePage() {
	const session = await getUserSession();

	if (!session) {
		return redirect('/not-auth');
	}

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session?.id),
		},
	});

	if (!user) {
		return redirect('/not-auth');
	}

	return <ProfileForm data={user} />;
}
