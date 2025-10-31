'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';

import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
	open: boolean;
	onClose: VoidFunction;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login');

	const onSwitchType = () => {
		setType((t) => (t === 'login' ? 'register' : 'login'));
	};

	const handleOpenChange = (nextOpen: boolean) => {
		if (!nextOpen) {
			onClose();
			setType('login');
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className='w-[450px] bg-white p-10'>
				<VisuallyHidden>
					<DialogTitle>
						{type === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
					</DialogTitle>
				</VisuallyHidden>

				<VisuallyHidden>
					<DialogDescription>
						{type === 'login'
							? 'Войдите в свой аккаунт'
							: 'Создайте новый аккаунт'}
					</DialogDescription>
				</VisuallyHidden>

				{type === 'login' ? (
					<LoginForm onClose={onClose} />
				) : (
					<RegisterForm onClose={onClose} />
				)}

				<hr />

				<div className='flex gap-2'>
					<Button
						variant='secondary'
						onClick={() =>
							signIn('github', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'
					>
						<img
							className='w-6 h-6'
							src='https://github.githubassets.com/favicons/favicon.svg'
							alt='GitHub'
						/>
						GitHub
					</Button>

					<Button
						variant='secondary'
						onClick={() =>
							signIn('google', {
								callbackUrl: '/',
								redirect: true,
							})
						}
						type='button'
						className='gap-2 h-12 p-2 flex-1'
					>
						<img
							className='w-6 h-6'
							src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
							alt='Google'
						/>
						Google
					</Button>
				</div>

				<Button
					variant='outline'
					onClick={onSwitchType}
					type='button'
					className='h-12'
				>
					{type !== 'login' ? 'Войти' : 'Регистрация'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
