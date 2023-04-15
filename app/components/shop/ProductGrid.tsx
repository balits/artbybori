import {flattenConnection} from '@shopify/hydrogen';
import {
  Image,
  MoneyV2,
  type Product,
} from '@shopify/hydrogen/storefront-api-types';
import {CgSpinner} from 'react-icons/cg';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import Container from '../global/Container';
import {Link} from '../Link';
import ProductCard from '~/components/shop/ProductCard';

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({products}: ProductGridProps) {
  return (
    <Container className="mb-16 scaling-mt-header">
      <ul className='grid gap-x-6 gap-y-4 md:gap-y-8 lg:gap-y-12 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 '>
        {products.map((product) => {
          let extraLabel = '';

          const defaultVairant = flattenConnection(product.variants)[0];

          if (!defaultVairant) return <></>;
          const {price, compareAtPrice, image} = defaultVairant;

          if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
            extraLabel = 'sale';
          } else if (isNewArrival(product.publishedAt)) {
            extraLabel = 'new';
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
    </Container>
  );
}

export const Fallback = () => (
  <Container className="mb-16 scaling-mt-header grid gap-x-6 gap-y-4 md:gap-y-8 lg:gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
    {[0, 1, 2, 3, 4, 5].map((e) => (
      <div
        key={e}
        className="rounded-sm grid place-items-center bg-custom-placeholder-green aspect-square overflow-hidden cursor-not-allowed transition-all delay-75 hover:opacity-80"
      />
    ))}
  </Container>
);
