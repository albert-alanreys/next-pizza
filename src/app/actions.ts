'use server';

import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

import { TFormOrderData } from '@/components/shared/schemas/order-form-schema';

import { createPayment } from '@/lib/create-payment';
import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/send-email';

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) {
				throw new Error('Почта не подтверждена');
			}

			throw new Error('Пользователь уже существует');
		}

		const createdUser = await prisma.user.create({
			data: {
				...body,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
				expiresAt: new Date(Date.now() + 10 * 60 * 1000),
			},
		});

		console.log(createdUser);

		const html = `
    <p>Код подтверждения: <h2>${code}</h2></p>
    <p><a href="http://localhost:3000/api/auth/verify?code=${code}">Подтвердить регистрацию</a></p>
    `;

		await sendEmail(
			createdUser.email,
			'Next Pizza / Подтверждение регистрации',
			html,
		);
	} catch (error) {
		console.log('Error [CREATE_USER]', error);
		throw error;
	}
}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error('Пользователь не найден');
		}

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				...body,
				password: hashSync(body.password, 10),
			},
		});
	} catch (error) {
		console.log('Error [UPDATE_USER]', error);
		throw error;
	}
}

export async function createOrder(data: TFormOrderData) {
	try {
		const currentUser = await getUserSession();
		const userId = Number(currentUser?.id);
		const cookieStore = await cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				OR: [
					{
						userId,
					},
					{
						tokenId: cartToken,
					},
				],
			},
		});

		if (!userCart?.totalAmount) {
			return;
		}

		if (!userCart) {
			throw new Error('Cart not found');
		}

		const order = await prisma.order.create({
			data: {
				userId,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

		const paymentData = await createPayment({
			orderId: order.id,
			amount: order.totalAmount,
			description: `Заказ #${order.id}`,
		});

		if (paymentData) {
			await prisma.order.update({
				where: {
					id: order.id,
				},
				data: {
					paymentId: paymentData.id,
				},
			});
		}

		const html = `
      <h1>Заказ #${order?.id}</h1>

      <p>Оплатите заказ на сумму ${order?.totalAmount}. Перейдите <a href="${paymentData.confirmation.confirmation_url}">по ссылке</a> для оплаты заказа.</p>
    `;

		if (userCart.user?.email) {
			await sendEmail(
				userCart.user?.email,
				`Next Pizza / Оплатите заказ #${order?.id}`,
				html,
			);
		}

		return paymentData.confirmation.confirmation_url;
	} catch (error) {
		console.log('[CART_CHECKOUT_POST] Server error', error);
		throw error;
	}
}
