'use server';

import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { revalidatePath } from 'next/cache';

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

/* Dashboard Actions */

export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
	try {
		await prisma.user.update({
			where: {
				id,
			},
			data: {
				...data,
				verified: new Date(),
				...(data.password && { password: hashSync(String(data.password), 10) }),
			},
		});
	} catch (error) {
		console.log('Error [UPDATE_USER]', error);
		throw error;
	}
}

export async function createUser(data: Prisma.UserCreateInput) {
	try {
		await prisma.user.create({
			data: {
				...data,
				password: hashSync(data.password, 10),
			},
		});

		revalidatePath('/dashboard/users');
	} catch (error) {
		console.log('Error [CREATE_USER]', error);
		throw error;
	}
}

export async function deleteUser(id: number) {
	await prisma.user.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/users');
}

export async function updateCategory(
	id: number,
	data: Prisma.CategoryUpdateInput,
) {
	try {
		await prisma.category.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_CATEGORY]', error);
		throw error;
	}
}

export async function createCategory(data: Prisma.CategoryCreateInput) {
	try {
		await prisma.category.create({
			data,
		});

		revalidatePath('/dashboard/categories');
	} catch (error) {
		console.log('Error [CREATE_CATEGORY]', error);
		throw error;
	}
}

export async function deleteCategory(id: number) {
	await prisma.category.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/categories');
}

export async function updateProduct(
	id: number,
	data: Prisma.ProductUpdateInput,
) {
	try {
		await prisma.product.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_PRODUCT]', error);
		throw error;
	}
}

export async function createProduct(data: Prisma.ProductCreateInput) {
	try {
		await prisma.product.create({
			data,
		});

		revalidatePath('/dashboard/products');
	} catch (error) {
		console.log('Error [CREATE_PRODUCT]', error);
		throw error;
	}
}

export async function deleteProduct(id: number) {
	await prisma.product.delete({
		where: {
			id,
		},
	});

	revalidatePath('/dashboard/products');
}

export async function updateIngredient(
	id: number,
	data: Prisma.IngredientUpdateInput,
) {
	try {
		await prisma.ingredient.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_INGREDIENT]', error);
		throw error;
	}
}

export async function createIngredient(data: Prisma.IngredientCreateInput) {
	try {
		await prisma.ingredient.create({
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
				price: data.price,
			},
		});

		revalidatePath('/dashboard/ingredients');
	} catch (error) {
		console.log('Error [CREATE_INGREDIENT]', error);
		throw error;
	}
}

export async function deleteIngredient(id: number) {
	try {
		await prisma.ingredient.delete({
			where: {
				id,
			},
		});

		revalidatePath('/dashboard/ingredients');
	} catch (error) {
		console.log('Error [DELETE_INGREDIENT]', error);
		throw error;
	}
}

export async function updateProductItem(
	id: number,
	data: Prisma.ProductItemUpdateInput,
) {
	try {
		await prisma.productItem.update({
			where: {
				id,
			},
			data,
		});
	} catch (error) {
		console.log('Error [UPDATE_PRODUCT_ITEM]', error);
		throw error;
	}
}

export async function createProductItem(
	data: Prisma.ProductItemUncheckedCreateInput,
) {
	try {
		await prisma.productItem.create({
			data: {
				price: data.price,
				size: data.size,
				pizzaType: data.pizzaType,
				productId: data.productId,
			},
		});

		revalidatePath('/dashboard/product-items');
	} catch (error) {
		console.log('Error [CREATE_PRODUCT_ITEM]', error);
		throw error;
	}
}

export async function deleteProductItem(id: number) {
	try {
		await prisma.productItem.delete({
			where: {
				id,
			},
		});

		revalidatePath('/dashboard/product-items');
	} catch (error) {
		console.log('Error [DELETE_PRODUCT_ITEM]', error);
		throw error;
	}
}
