import {Image} from '@shopify/hydrogen';
import {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, useScrolling } from 'react-use';
import { ProductGrid } from '../ProductGrid';
import { Heading } from '../ui';

type Props = {
  image: ImageType;
};

/***
 * The banner shown first when visiting the homepage.
 * Both on Desktop and Phones this Components takes up 100vw with no margin or max-width set
 */
export default function Banner({image}: Props) {
  const [scrollY, setScrollY] = useState(0)
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  },[])

  useEffect(() => {
    window.document.addEventListener("scroll", handleScroll, {passive: true})
    return () => window.document.removeEventListener("scroll", handleScroll)
  }, [scrollY])


  const containerRef = useRef<HTMLDivElement>(null)
  let progress = 0;
  if (containerRef.current) {
    progress = Math.min(1, scrollY / containerRef.current.clientHeight);
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 -z-10  bg-red-100 h-screen overflow-y-hidden grid place-items-center shadow-md relative"
        /* style={{
          transform: `translateY(${progress * 50}vh)`
        }} */
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
          transform: `translateY(-${progress * 40}vh)`
        }}
      >
        <div className="lg:p-4 z-[2] text-custom-white grid place-items-center">
          <Heading size='lg' as="h1">
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
