import {Link} from '@remix-run/react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {SerializeFrom} from '@shopify/remix-oxygen';
import clsx from 'clsx';
import Container from '../global/Container';
import {CgSpinner} from 'react-icons/cg';
import {Image, Money} from '@shopify/hydrogen';

interface Props {
  data: SerializeFrom<Product>[];
}

/**
 * Grid display of the fetured products, wrapped in a `ContentWrapper` (set an arbitrary max-width and centers content).
 *
 *
 */
const FeaturedProducts: React.FC<Props> = ({data: featuredProductList}) => {
  const products = featuredProductList as Product[];

  return (
    <Container className="mt-[10vh]">
      <h2 className="tracking-tight text-custom-black text-3xl md:text-4xl lg:text-5xl font-serif mb-4 ">
        Featured products.
      </h2>

      <ul className="grid w-full h-fit overflow-hidden grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3 ">
        {products.map((prod: Product, i: number) => {
          const image = prod.images.nodes[0];
          return (
            <li
              key={prod.id}
              className={clsx(
                i === 0 && 'block row-span-2 col-span-2 ',
                'relative  group rounded-sm min-w-full w-[20%] min-h-full aspect-square relative cursor-pointer basic-animation delay-0 hover:opacity-90',
              )}
            >
              <Link to={`/products/${prod.handle}`} prefetch="intent">
                <div className="aspect-square relative flex items-center justify-center overflow-clip rounded-sm">
                  {image && (
                    <Image
                      className="aspect-square w-full object-cover fadeIn"
                      widths={[400]}
                      loaderOptions={{
                        crop: 'center',
                        scale: 2,
                        width: 400,
                        height: 400,
                      }}
                      data={image}
                      alt={image.altText ?? prod.title}
                      loading="lazy"
                    />
                  )}
                </div>
                <div
                  className={clsx([
                    'absolute left-0 bottom-0  text-custom-white lg:basic-animation lg:opacity-0 lg:group-hover:opacity-100',
                    i === 0 ? 'p-4 lg:p-8' : 'p-2 lg:p-4',
                  ])}
                >
                  <p className=" font-semibold text-sm md:text-md lg:text-lg">
                    {prod.title}
                  </p>
                  <div className="uppercase text-xs sm:text-sm lg:text-md">
                    <Money
                      withoutTrailingZeros
                      data={prod.variants.nodes[0].price}
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default FeaturedProducts;

export const Skeleton: React.FC = () => (
  <Container className="mt-[10vh]">
    <h2 className="tracking-tight text-custom-black text-3xl md:text-4xl lg:text-5xl font-serif mb-4 ">
      Featured products.
    </h2>

    <ul className="grid w-full h-fit overflow-hidden grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3 ">
      {[0, 1, 2, 3, 4].map((num) => {
        return (
          <li
            key={num}
            className={clsx(
              num === 0 && 'block row-span-2 col-span-2 ',
              'grid bg-custom-placeholder-green bg-custom-placeholder-green place-items-center relative rounded-sm min-w-full w-[20%] min-h-full aspect-square cursor-not-allowed transition-all ease-in-out delay-75 duration-150 hover:opacity-90',
            )}
          ></li>
        );
      })}
    </ul>
  </Container>
);
