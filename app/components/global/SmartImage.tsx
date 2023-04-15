import { Image } from '@shopify/hydrogen';
import { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';

type SmartImageProps = {
  image: ImageType;
  alt: string;
  widths?: number[];
  sizes?: string;
  height?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  className?: string;
};

export default function SmartImage({
  image,
  alt,
  widths,
  sizes,
  defaultHeight,
  defaultWidth,
  className,
}: SmartImageProps) {
  const WIDTHS = defaultWidth ? [defaultWidth] : widths ? widths : [320];
  const SIZES = defaultWidth
    ? defaultWidth.toString().concat('px')
    : sizes
      ? sizes
      : '320px';
  const LOADER_WIDTHS = defaultWidth ? defaultWidth : widths ? widths[0] : 320;

  return (
    <div
      className={clsx(
        `aspect-[4/5] relative flex items-center justify-center overflow-clip rounded-sm`,
        className,
      )}
    >
      <Image
        className="aspect-[4/5] w-full h-full object-cover fadeIn"
        data={image}
        alt={alt}
        widths={WIDTHS}
        sizes={SIZES}
        loaderOptions={{
          crop: 'center',
          scale: 2,
          width: LOADER_WIDTHS,
          height: defaultHeight ?? 400,
        }}
        loading="eager"
      />
    </div>
  );
}
