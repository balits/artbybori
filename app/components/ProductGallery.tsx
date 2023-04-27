import type {Image as ImageType, MediaEdge} from '@shopify/hydrogen/storefront-api-types';
import {ATTR_LOADING_EAGER} from '~/lib/const';
import type {MediaImage} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import Carousel from 'react-multi-carousel';
import { MyDots } from './global/Carousel';
import { useWindowSize } from 'react-use';
import { Image as ImageComp, MediaFile } from '@shopify/hydrogen';

/**
* A client component that defines a media gallery for hosting images, 3D models, and videos of products
*/
export function ProductGallery({
  media,
  className,
}: {
    media: MediaEdge['node'][];
    className?: string;
  }) {
  if (!media.length) {
    return null;
  }

  const repsonsive = {
    normal: {
      breakpoint : {max: 10000, min: 0},
      items: 1
    }
  }

  const {width} = useWindowSize();

  return width <= 768 ? (
    <Carousel responsive={repsonsive} arrows={false} draggable showDots customDot={<MyDots />}>
      {media.map((med, i) => {
        let mediaProps: Record<string, any> = {};

        const data = {
          ...med,
          image: {
            // @ts-ignore
            ...med.image,
            altText: med.alt || 'Product image',
          },
        } as MediaImage;

        switch (med.mediaContentType) {
          case 'IMAGE':
            mediaProps = {
              width: 800,
              widths: [400, 800, 1200, 1600, 2000, 2400],
            };
            break;
          case 'VIDEO':
            mediaProps = {
              width: '100%',
              autoPlay: true,
              controls: false,
              muted: true,
              loop: true,
              preload: 'auto',
            };
            break;
          case 'EXTERNAL_VIDEO':
            mediaProps = {width: '100%'};
            break;
          case 'MODEL_3D':
            mediaProps = {
              width: '100%',
              interactionPromptThreshold: '0',
              ar: true,
              loading: ATTR_LOADING_EAGER,
              disableZoom: true,
            };
            break;
        }

        if (i === 0 && med.mediaContentType === 'IMAGE') {
          mediaProps.loading = ATTR_LOADING_EAGER;
        }

        const style = 'w-full aspect-square snap-center card-image bg-gray-100 '

        return (
          <div
            className={style}
            // @ts-ignore
            key={med.id || med.image.id}
          >
            {/* TODO: Replace with MediaFile when it's available */}
            {(med as MediaImage).image && (
              <MediaFile
                tabIndex={0}
                className={`w-full h-full aspect-square fadeIn object-cover `}
                data={data}
                // @ts-ignore
                options={{
                  loading:"eager",
                  crop: 'center',
                  scale: 2,
                  sizes: '(min-width: 64em) 60vw, (min-width: 48em) 50vw, 90vw'
                }}
                {...mediaProps}
              />)}
          </div>
        );
      })}
    </Carousel>
  ) : (
      <ul
        className={`grid gap-2 md:gap-3 lg:gap-4 grid-flow-row hiddenScroll overflow-x-scroll grid-cols-2 ${className} p-0`}>
        {media.map((med,i) => {

          let mediaProps: Record<string, any> = {};
          const isFirst = i === 0;
          const isFourth = i === 3;
          const isFullWidth = i % 3 === 0;

          const data = {
            ...med,
            image: {
              // @ts-ignore
              ...med.image,
              altText: med.alt || 'Product image',
            },
          } as MediaImage;

          switch (med.mediaContentType) {
            case 'IMAGE':
              mediaProps = {
                width: 800,
                widths: [400, 800, 1200, 1600, 2000, 2400],
              };
              break;
            case 'VIDEO':
              mediaProps = {
                width: '100%',
                autoPlay: true,
                controls: false,
                muted: true,
                loop: true,
                preload: 'auto',
              };
              break;
            case 'EXTERNAL_VIDEO':
              mediaProps = {width: '100%'};
              break;
            case 'MODEL_3D':
              mediaProps = {
                width: '100%',
                interactionPromptThreshold: '0',
                ar: true,
                loading: ATTR_LOADING_EAGER,
                disableZoom: true,
              };
              break;
          }

          if (i === 0 && med.mediaContentType === 'IMAGE') {
            mediaProps.loading = ATTR_LOADING_EAGER;
          }

          const style = clsx(
            'w-full  card-image bg-gray-100 fadeIn animate-pulse',
            isFullWidth ? 'aspect-square col-span-2' : 'col-span-1',
            isFirst || isFourth ? '' : 'aspect-[4/5]',
          );

          return (
            <li
              className={style}
              // @ts-ignore
              key={med.id || med.image.id}
            >
              {/* TODO: Replace with MediaFile when it's available */}
              {(med as MediaImage).image && (
                <ImageComp
                  className={`w-full h-full aspect-square fadeIn object-cover `}
                  data={data.image as ImageType}
                  // @ts-ignore
                  options={{
                    loading:"eager",
                    crop: 'center',
                    scale: 2,
                    sizes: '(min-width: 64em) 60vw, (min-width: 48em) 50vw, 90vw'
                  }}
                  {...mediaProps}
                />)}
            </li>
          );
        })}
      </ul>
    )
}
