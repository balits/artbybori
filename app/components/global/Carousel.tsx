import { Collection, Product } from '@shopify/hydrogen/storefront-api-types';
import { Link } from "~/components"
import SmartImage from '~/components/global/SmartImage';
import { SerializeFrom } from '@shopify/remix-oxygen';
import ProductCard from '../shop/ProductCard';

type DefaultCarouselProps = {
  textOnTop: boolean;
}

type CarouselProps = DefaultCarouselProps & {
  collections: SerializeFrom<Collection[]>;
};

export function CollectionCarousel({
  collections,
  textOnTop = false
}: CarouselProps) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  return (
    <ul
      className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {collections.map((coll) => {
        if (!coll.image) return null
        return (
          <li key={coll.id} className="snap-center relative group cursor-pointer ">
            <Link to={`/collections/${coll.handle}`} prefetch="intent">
              <SmartImage
                image={coll.image}
                widths={[280, 350,450,550, 650]}
                sizes="(max-width: 768px) 80vw, 60vw"
                alt={coll.image?.altText ?? coll.title}
                className="w-full h-[300px] sm:h-auto sm:w-carousel-item-sm md:w-carousel-item-md lg:w-carousel-item-lg "
                loading='eager'
              />
              {textOnTop ?  (
                <div className="absolute z-[2] inset-0 w-full h-full grid place-items-center basic-animation group-hover:bg-black/10">
                  <h3 className="z-[3] text-xl md:text-2xl lg:text-3xl  font-bold uppercase text-white basic-animation opacity-0 group-hover:opacity-100">
                    {coll.title}
                  </h3>
                </div>
              ): (
                <h3 className='mt-2 lg:mt-3 xl:mt-4 font-medium text-sm md:text-md xl:text-lg'>{coll.title}</h3>
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  );
}

type ProductCarouselProps = DefaultCarouselProps & {
  products: SerializeFrom<Product[]>;
};

export function ProductCarousel({
  products,
  textOnTop,
}: ProductCarouselProps) {
  return (
    <ul className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {products.map((prod) => {
        const variant = prod.variants.nodes[0];
        if(!variant.image) return null;

        return <li key={prod.id} className="snap-start relative group cursor-pointer sm:w-carousel-item-sm md:w-carousel-item-md lg:w-carousel-item-lg ">
          <Link to={`/products/${prod.handle}`} prefetch="intent">
            <ProductCard
              title={prod.title}
              money={variant.price}
              img={variant.image}
              textOnTop={textOnTop}
            />
          </Link>
        </li>
      })}
    </ul>
  );
}

export function Skeleton() {
  return (
    <ul className='grid w-full snap-mandatory snap-x scroll-px-6 grid-rows-1 grid-flow-col justify-start gap-6 md:gap-10 lg:gap-12 overflow-x-scroll hiddenScroll'>
      {[1,2,3,4,5].map((x) => (
        <li key={x} className="snap-start relative group cursor-pointer sm:w-carousel-item-sm md:w-carousel-item-md lg:w-carousel-item-lg " />
      ))}
    </ul>
  );
}
