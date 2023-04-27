import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Heading } from '../ui';
import { ScrollContext } from '../utils/ScrollObserver';

type Props = {
  image: ImageType;
};

/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner({image}: Props) {
  const {scrollY} = useContext(ScrollContext)

  const containerRef = useRef<HTMLDivElement>(null)
  let progress = 0;
  if (containerRef.current) {
    progress = Math.min(1, scrollY / containerRef.current.clientHeight);
  }

  return (
    <div
      ref={containerRef}
      className="sticky top-0 -z-10  bg-custom-placeholder-green h-screen overflow-y-hidden grid place-items-center shadow-md relative"
        style={{
          transform: `translateY(-${progress * 40}vh)`
        }}
    >
      <Image
        data={image}
        className="absolute inset-0 w-full h-full object-cover"
        alt={image.altText ?? 'Ceramics for your home'}
        loading="eager"
        widths={[500, 900, 1400]}
        sizes="(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px"
      />
      <div
        className="absolute inset-0 w-full h-full grid place-items-center"
        style={{
          transform: `translateY(-${progress * 20}vh)`
        }}
      >
        <div className="lg:p-4 z-[2] text-custom-white grid place-items-center">
          <Heading size='lg' as="h1" className='drop-shadow-md'>
          Ceramics&nbsp;
          <br className="lg:hidden" />
          for&nbsp;your&nbsp;
          <br className="lg:hidden" />
          home.
          </Heading>
        </div>
      </div>
    </div>
  );
}
