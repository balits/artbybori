import React from 'react';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
import {SerializeFrom} from '@shopify/remix-oxygen';
import Container from './Container';

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles

// import required modules
import {Pagination} from 'swiper';

type MultiCarouselProps = {
  array: SerializeFrom<Collection>[];
};
const MultiCarousel: React.FC<MultiCarouselProps> = ({array}) => {
  const collections = array.filter(
    (e) => e.handle !== 'featured-products',
  ) as Collection[];

  return (
    <section className="bg-custom-signature-green w-full h-fit p-12 my-12">
      <Container className="">
        <h2 className="mb-12 text-4xl text-custom-white font-cantata font-semibold ">
          Shop by categories.
        </h2>
        <Swiper
          slidesPerView={1}
          pagination={{clickable: true}}
          modules={[Pagination]}
          className="w-full h-full "
        >
          <SwiperSlide>a</SwiperSlide>
          <SwiperSlide>c</SwiperSlide>
          <SwiperSlide>b</SwiperSlide>
        </Swiper>
      </Container>
    </section>
  );
};
export default MultiCarousel;
/* {collections.map((c) => (
            <SwiperSlide
              className="bg-custom-placeholder-green h-[300px] aspect-square grid place-items-center"
              key={c.id}
            >
              {c.title}
            </SwiperSlide>
          ))} */

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
