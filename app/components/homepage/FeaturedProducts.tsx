import { Link, MyMoney, Text } from '../ui';
import type { Product, Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import { SerializeFrom } from '@shopify/remix-oxygen';
import clsx from 'clsx';
import { Image, Money } from '@shopify/hydrogen';
import { useState } from 'react';

interface Props {
  data: SerializeFrom<Product>[];
}

const FeaturedProducts: React.FC<Props> = ({ data: featuredProductList }) => {
  const products = featuredProductList as Product[];

  return (
    <ul className="grid w-full h-fit overflow-hidden grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3 ">
      {products.map((prod: Product, i: number) => {
        const image1 = prod.images.nodes[0];
        const image2 = prod.images.nodes[1];
        return (
          <li
            key={prod.id}
            className={clsx(
              i === 0 && 'block row-span-2 col-span-2 ',
              'relative  group rounded-sm min-w-full w-[20%] min-h-full aspect-square relative cursor-pointer basic-animation delay-0 hover:opacity-90',
            )}
          >
            <Link to={`/products/${prod.handle}`} prefetch="intent">
              <Card
                image1={image1}
                image2={image2}
                product={prod}
                index={i}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default FeaturedProducts;

const Card = ({
  image1,
  image2,
  product,
  index,
}: {
  image1: ImageType,
  image2: ImageType,
  product: Product,
  index: number
}) => {
  const [hover, setHover] = useState(false)


  return (
    <>
      <div
        className="aspect-square relative flex items-center justify-center overflow-clip rounded-sm"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {(
          <Image
            className="aspect-square w-full object-cover fadeIn"
            widths={[400]}
            loaderOptions={{
              crop: 'center',
              scale: 2,
              width: 400,
              height: 400,
            }}
            data={hover ? image2 : image1}
            alt={image1.altText ?? product.title}
            loading="lazy"
          />
        )}
      </div>
      <div
        className={clsx([
          'absolute left-0 bottom-0  text-custom-white lg:basic-animation lg:opacity-0 lg:group-hover:opacity-100',
          index === 0 ? 'p-4 lg:p-8' : 'p-2 lg:p-4',
        ])}
      >
        <Text>
          {product.title}
        </Text>
        <Text bold as={"div"}>
          <MyMoney
            data={product.variants.nodes[0].price}
          />
        </Text>
      </div>
    </>

  )
}


export const Skeleton: React.FC = () => (
  <ul className="grid w-full h-fit overflow-hidden grid-cols-2 grid-rows-4 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3 ">
    {[0, 1, 2, 3, 4].map((num) => {
      return (
        <li
          key={num}
          className={clsx(
            num === 0 && 'block row-span-2 col-span-2 ',
            'grid bg-custom-placeholder-green place-items-center relative rounded-sm min-w-full w-[20%] min-h-full aspect-square cursor-not-allowed transition-all ease-in-out delay-75 duration-150 hover:opacity-90',
          )}
        />
      );
    })}
  </ul>
);
