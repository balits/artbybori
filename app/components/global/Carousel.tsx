import { Collection, Product } from '@shopify/hydrogen/storefront-api-types';
<<<<<<< HEAD
import { Link } from "~/components"
import SmartImage from './SmartImage';
import { SerializeFrom } from '@shopify/remix-oxygen';

type DefaultCarouselProps = {
  withHover?: boolean,
  withLink?: boolean,
}

type CarouselProps = DefaultCarouselProps & {
  collections: SerializeFrom<Collection[]>;
};

export function CollectionCarousel({collections}: CarouselProps) {
  return (
    <ul
      className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {collections.map((coll) => (
        <li key={coll.id} className="snap-center relative group cursor-pointer ">
=======
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
>>>>>>> refs/remotes/origin/main
          <Link to={`/collections/${coll.handle}`} prefetch="intent">
            <SmartImage
              image={coll.image!}
              alt={coll.image?.altText ?? coll.title}
<<<<<<< HEAD
              className="w-full h-[300px] sm:h-auto sm:w-[350px] md:w-[380px] lg:w-[400px] "
              loading='eager'
            />
=======
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
>>>>>>> refs/remotes/origin/main
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

<<<<<<< HEAD
type ProductCarouselProps = DefaultCarouselProps & {
  products: SerializeFrom<Product[]>;
};

export function ProductCarousel({
  products,
  withHover = false,
  withLink = true
}: ProductCarouselProps) {
  return (
    <ul className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
=======
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
>>>>>>> refs/remotes/origin/main
      {products.map((prod) => (
        <li key={prod.id} className="snap-start relative group cursor-pointer">
          <Link to={`/products/${prod.handle}`} prefetch="intent">
            <div className="shadow-sm aspect-square h-auto w-[80vw]  md:w-carousel-item-md lg:w-carousel-item-lg xl:w-carousel-item-xl rounded-sm bg-custom-placeholder-green/80">
<<<<<<< HEAD
              <SmartImage
                image={prod.images.nodes[0]}
                alt={prod.images.nodes[0].altText ?? prod.title}
                className="w-full h-[300px] sm:h-auto sm:w-[350px] md:w-[380px] lg:w-[400px] "
                loading="lazy"
              />
            </div>
            {withHover ? (
              <div className="absolute z-[2] inset-0 w-full h-full grid place-items-center basic-animation group-hover:bg-black/30">
                <h3 className="z-[3] text-xl md:text-2xl lg:text-3xl  xl:text-4xl font-bold uppercase text-white basic-animation opacity-0 group-hover:opacity-100">
                  {prod.title}
                </h3>
              </div>
            ): (
              <div className='mt-4 grid gap-4'>
                <h3 className=''>{prod.title}</h3>
              </div>
            )}
=======
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
>>>>>>> refs/remotes/origin/main
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Skeleton() {
  return (
<<<<<<< HEAD
      <ul className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {[1,2,3,4,5].map((x) => (
        <li key={x} className="snap-center relative group cursor-pointer w-full h-[300px] sm:h-auto sm:w-[350px] md:w-[380px] lg:w-[400px]" />
=======
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
>>>>>>> refs/remotes/origin/main
      ))}
    </ul>
  );
}
