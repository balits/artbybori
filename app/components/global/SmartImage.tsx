import { Image } from '@shopify/hydrogen';
import { Image as ImageType } from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';

type SmartImageProps = {
  image: ImageType;
  alt: string;
<<<<<<< HEAD
  loading: "eager" | "lazy"
=======
>>>>>>> refs/remotes/origin/main
  widths?: number[];
  sizes?: string;
  height?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  className?: string;
};

<<<<<<< HEAD
export default function SmarrImage({
  image,
  alt,
  loading,
=======
export default function SmartImage({
  image,
  alt,
>>>>>>> refs/remotes/origin/main
  widths,
  sizes,
  defaultHeight,
  defaultWidth,
  className,
}: SmartImageProps) {
<<<<<<< HEAD
  const WIDTHS = defaultWidth ? [defaultWidth] : widths ? widths : [350];
=======
  const WIDTHS = defaultWidth ? [defaultWidth] : widths ? widths : [320];
>>>>>>> refs/remotes/origin/main
  const SIZES = defaultWidth
    ? defaultWidth.toString().concat('px')
    : sizes
      ? sizes
      : '320px';
<<<<<<< HEAD
  const LOADER_WIDTHS = defaultWidth ? defaultWidth : widths ? widths[0] : 350;
=======
  const LOADER_WIDTHS = defaultWidth ? defaultWidth : widths ? widths[0] : 320;
>>>>>>> refs/remotes/origin/main

  return (
    <div
      className={clsx(
<<<<<<< HEAD
        `aspect-[4/5] relative flex items-center justify-center overflow-clip rounded-sm shadow-sm`,
=======
        `aspect-[4/5] relative flex items-center justify-center overflow-clip rounded-sm`,
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
          height: defaultHeight ?? 450,
        }}
        loading={loading}
=======
          height: defaultHeight ?? 400,
        }}
        loading="eager"
>>>>>>> refs/remotes/origin/main
      />
    </div>
  );
}
