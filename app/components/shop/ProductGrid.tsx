import { flattenConnection } from '@shopify/hydrogen';
import {
  Image,
  MoneyV2,
  type Product,
} from '@shopify/hydrogen/storefront-api-types';
import { isDiscounted, isNewArrival } from '~/lib/utils';
import { Link } from '~/components';
import ProductCard from '~/components/shop/ProductCard';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  return (
      <ul className='grid gap-6 md:gap-8 xl:gap-12 grid-cols-1 place-items-center xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
        {products.map((product, i) => {
          let extraLabel = '';

          const defaultVairant = flattenConnection(product.variants)[0];

          if (!defaultVairant) return <></>;
          const { price, compareAtPrice, image } = defaultVairant;

          if (defaultVairant.availableForSale) {
            if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
              extraLabel = 'sale';
            } else if (isNewArrival(product.publishedAt)) {
              extraLabel = 'new';
            }
          } else {
            extraLabel = "sold out :("
          }


          return (
            <li key={product.id}>
              <Link prefetch="intent" to={`/products/${product.handle}`}>
                <ProductCard
                  title={product.title}
                  money={price}
                  img={image as Image}
                  extraLabel={extraLabel}
                />
              </Link>
            </li>
          );
        })}
      </ul>
  );
}

export const Fallback = () => (
      <ul className='grid gap-x-6 gap-y-4 md:gap-y-8 lg:gap-y-12 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-4 '>
    {[0, 1, 2, 3, 4, 5].map((e) => (
      <li
        key={e}
        className="animate-pulse rounded-sm grid place-items-center bg-custom-placeholder-green aspect-square overflow-hidden cursor-not-allowed transition-all delay-75 hover:opacity-80"
      />
    ))}
  </ul>
);
