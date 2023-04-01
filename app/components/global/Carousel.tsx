import {useState} from 'react';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
import {SerializeFrom} from '@shopify/remix-oxygen';

import Carousel, {ResponsiveType} from 'react-multi-carousel';

type MultiCarouselProps = {
  array: SerializeFrom<Collection>[];
};
const MultiCarousel: React.FC<MultiCarouselProps> = ({array}) => {
  const collections = array.filter(
    (e) => e.handle !== 'featured-products',
  ) as Collection[];
  const [current, setCurrent] = useState(0);

  console.log(collections);

  const resp: ResponsiveType = {
    bigDesktop: {
      breakpoint: {
        max: 5000,
        min: 1280,
      },
      items: 4,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: {
        max: 1280,
        min: 1024,
      },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 768,
      },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: {
        max: 768,
        min: 0,
      },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <section className="bg-custom-signature-green w-full h-fit p-12 my-12">
      <h2 className="mb-12 text-4xl text-custom-white font-cantata font-semibold ">
        Shop by categories.
      </h2>
      <Carousel responsive={resp}>
        {collections.map((coll, idx) => (
          <div
            key={coll.id ?? idx}
            className="relative aspect-square w-[250px] md:w-[350px] lg:w-[400px] xl:w-[450px]"
          >
            <img
              src={coll.image?.url}
              alt={coll.image?.altText ?? coll.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};
export default MultiCarousel;

export const Skeleton: React.FC = () => {
  return <section></section>;
};
/*
        <div
          style={{
            backgroundImage: `url(${collections[current].image?.url})`,
          }}
        />
* */
