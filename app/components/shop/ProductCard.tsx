import {Image, Money} from '@shopify/hydrogen';
import {
  Image as ImageType,
  MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';

type ProductCardProps = {
  title: string;
  money: MoneyV2;
  img: ImageType;
  extraLabel?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  money,
  img,
  extraLabel,
}) => {
  return (
    <div className="w-[70vw] md:w-full bg-custom-placeholder-green rounded-sm group relative aspect-square overflow-hidden cursor-pointer transition-all  hover:opacity-80">
      <div>
        <Image
          className=" aspect-square  w-full object-cover fadeIn"
          data={img}
          alt={img.altText ?? title}
        />
      </div>
      {extraLabel && (
        <div className="absolute top-0 right-0 p-4">
          <p className="w-fit tracking-tight text-xs lg:text-md text-custom-white uppercase tracking-tight font-medium">
            {extraLabel}
          </p>
        </div>
      )}
      <div className="text-custom-white transition-colors delay-75 ease-in-out group-hover:text-white absolute bottom-0 w-full">
        <div className="grid grid-cols-1 text-sm md:text-md lg:text-lg p-4  ">
          <p className=" font-semibold text-autoscale">{title}</p>
          <Money
            className="text-autoscale-small"
            withoutTrailingZeros
            data={money}
          />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
