import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';

import { FormInput } from '@/components/shared/form';
import { Title } from '@/components/shared/title';

import { TFormLoginData, formLoginSchema } from './schemas';

interface Props {
	onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginData>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: TFormLoginData) => {
		try {
			const resp = await signIn('credentials', {
				...data,
				redirect: false,
			});

			if (!resp?.ok) {
				return toast.error('Неверный E-Mail или пароль', {
					icon: '❌',
				});
			}

			onClose?.();
		} catch (error) {
			console.log('Error [LOGIN]', error);
			toast.error('Не удалось войти', {
				icon: '❌',
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form
				className='flex flex-col gap-5'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex justify-between items-center'>
					<div className='mr-2'>
						<Title text='Вход в аккаунт' size='md' className='font-bold' />
						<p className='text-gray-400'>
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src='/images/phone-icon.png'
						alt='phone-icon'
						width={60}
						height={60}
					/>
				</div>

				<FormInput name='email' label='E-Mail' required />
				<FormInput type='password' name='password' label='Пароль' required />

				<Button
					disabled={form.formState.isSubmitting}
					className='h-12 text-base'
					type='submit'
				>
					{form.formState.isSubmitting ? 'Вход...' : 'Войти'}
				</Button>
			</form>
		</FormProvider>
	);
};
