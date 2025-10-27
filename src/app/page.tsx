import {
	Container,
	Filters,
	ProductCard,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />

			<Container className='mt-9 pb-14'>
				<div className='flex gap-[80px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>

					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пиццы'
								products={[
									{
										id: 1,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 2,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 3,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 4,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 5,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 6,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 7,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 8,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
									{
										id: 9,
										name: 'Четыре сезона',
										price: 539,
										imageUrl:
											'https://media.dodostatic.net/image/r:292x292/0198bf47733e787a98ed55d13e9a2251.avif',
									},
								]}
								categoryId={1}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
