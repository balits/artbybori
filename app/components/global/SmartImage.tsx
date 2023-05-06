import { Image } from '@shopify/hydrogen';
import { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';

type SmartImageProps = {
  image: ImageType;
  alt: string;
  loading: "eager" | "lazy"
  widths?: number[];
  sizes?: string;
  height?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  className?: string;
  imgClassName?: string;
};

export default function SmartImage({
  image,
  alt,
  loading,
  widths,
  sizes,
  defaultHeight,
  defaultWidth,
  className,
  imgClassName,
}: SmartImageProps) {
  const WIDTHS = defaultWidth ? [defaultWidth] : widths ? widths : [350];
  const SIZES = defaultWidth
    ? defaultWidth.toString().concat('px')
    : sizes
      ? sizes
      : '320px';
  const LOADER_WIDTHS = defaultWidth ? defaultWidth : widths ? widths[0] : 350;

  return (
    <div
      className={clsx(
        `aspect-[4/5] bg-gray-100 relative flex items-center justify-center overflow-clip `,
        className,
      )}
    >
      <Image
        className={clsx("aspect-[4/5] w-full h-full object-cover card-image fadeIn", imgClassName)}
        data={image}
        alt={alt}
        widths={WIDTHS}
        sizes={SIZES}
        loaderOptions={{
          crop: 'center',
          scale: 2,
          width: LOADER_WIDTHS,
          height: defaultHeight ?? 450,
        }}
        loading={loading}
      />
    </div>
  );
}
