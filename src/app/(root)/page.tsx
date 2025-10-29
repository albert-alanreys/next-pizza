import {
	Container,
	Filters,
	Pagination,
	ProductsGroupList,
	Stories,
	Title,
	TopBar,
} from '@/components/shared';

import { GetSearchParams, findPizzas } from '@/lib/find-pizzas';

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<GetSearchParams>;
}) {
	const params = await searchParams;
	const [categoryProducts, meta] = await findPizzas(params);

	return (
		<>
			<Container className='mt-5'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>

			<TopBar
				categories={categoryProducts.filter((c) => c.products.length > 0)}
			/>

			<Stories />

			<Container className='pb-14'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{categoryProducts.map((category) => {
								return (
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											products={category.products}
											categoryId={category.id}
										/>
									)
								);
							})}
						</div>

						<div className='flex items-center gap-6 mt-12'>
							<Pagination
								pageCount={meta.pageCount}
								currentPage={meta.currentPage}
							/>
							<span className='text-sm text-gray-400'>5 из 65</span>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
