import { ICartItem } from '@/store/cart';

import { CartResponse } from '@/services/dto/cart';

import { calcCartItemTotalAmount } from './calc-cart-item-total-amount';

type ReturnProps = {
	items: ICartItem[];
	totalAmount: number;
};

export const getCartDetails = (data: CartResponse | null): ReturnProps => {
	if (!data) {
		return {
			items: [],
			totalAmount: 0,
		};
	}

	const items = (data.items || []).map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalAmount(item),
		pizzaSize: item.pizzaSize,
		type: item.type,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return { items, totalAmount: data.totalAmount || 0 };
};
