import { IProduct } from 'boundless-api-client';
import { TQuery } from '../@types/common';
import ProductItem from './productsList/ProductItem';

export default function ProductsList({ products, query, categoryId }: IProductListProps) {
	// Lọc các sản phẩm để đảm bảo không có sản phẩm trùng lặp theo catalog
	const uniqueProducts = Array.from(new Map(products.map(product => [product.catalog, product])).values());

	return (
		<ul className='products list-unstyled'>
			{uniqueProducts.map(product => (
				<ProductItem product={product} key={product.catalog} query={query} categoryId={categoryId} />
			))}
		</ul>
	);
}

interface IProductListProps {
	products: IProduct[];
	query: TQuery;
	categoryId?: number;
}
