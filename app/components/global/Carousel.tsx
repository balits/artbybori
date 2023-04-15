import { Collection, Product } from '@shopify/hydrogen/storefront-api-types';
import { SerializeFrom } from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';
import clsx from 'clsx';
import { Link } from '@remix-run/react';
import SmartImage from './SmartImage';

type CarouselProps = {
  collections: Collection[];
};

export function CollectoinCarousel({collections}: CarouselProps) {
  return (
    <ul
      className={clsx(
        'grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll',
        'hiddenScroll ',
      )}
    >
      {collections.map((coll) => (
        <li key={coll.id} className="snap-start relative group cursor-pointer ">
          <Link to={`/collections/${coll.handle}`} prefetch="intent">
            <SmartImage
              image={coll.image!}
              alt={coll.image?.altText ?? coll.title}
              className="w-[380px] "
            />
            {/* <div className="shadow-sm aspect-square h-auto w-[80vw]  md:w-carousel-item-md lg:w-carousel-item-lg xl:w-carousel-item-xl rounded-sm bg-custom-placeholder-green/80">
              <Image
                data={coll.image!}
                alt={coll.description ?? coll.title}
                className="aspect-square w-full object-cover rounded-sm fadeIn"
                loading="lazy"
              />
            </div> */}
            <div className="absolute z-[2] inset-0 w-full h-full grid place-items-center basic-animation group-hover:bg-black/10">
              <h3 className="z-[3] text-xl md:text-2xl lg:text-3xl  font-bold uppercase text-white basic-animation opacity-0 group-hover:opacity-100">
                {coll.title}
              </h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

type ProductCarouselProps = {
  products: SerializeFrom<Product>[];
};

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <ul
      className={clsx(
        'grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll',
        'hiddenScroll ',
      )}
    >
      {products.map((prod) => (
        <li key={prod.id} className="snap-start relative group cursor-pointer">
          <Link to={`/products/${prod.handle}`} prefetch="intent">
            <div className="shadow-sm aspect-square h-auto w-[80vw]  md:w-carousel-item-md lg:w-carousel-item-lg xl:w-carousel-item-xl rounded-sm bg-custom-placeholder-green/80">
              <Image
                data={prod.featuredImage!}
                alt={prod.featuredImage?.altText ?? prod.title}
                className="aspect-square w-full object-cover rounded-sm fadeIn"
                loading="lazy"
              />
            </div>
            <div className="absolute z-[2] inset-0 w-full h-full grid place-items-center basic-animation group-hover:bg-black/30">
              <h3 className="z-[3] text-xl md:text-2xl lg:text-3xl  xl:text-4xl font-bold uppercase text-white basic-animation opacity-0 group-hover:opacity-100">
                {prod.title}
              </h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Skeleton() {
  return (
    <ul
      className={clsx(
        'grid w-full snap-x snap-mandatory scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-8 overflow-x-scroll',
        'hiddenScroll ',
      )}
    >
      {[1, 2, 3, 4, 5, 6].map((x) => (
        <li key={x} className="relative group cursor-pointer">
          <div className="shadow-sm aspect-square h-auto w-[70vw]  md:w-carousel-item-md lg:w-carousel-item-lg xl:w-carousel-item-xl rounded-sm bg-custom-placeholder-green/60" />
        </li>
      ))}
    </ul>
  );
}
