import {Money} from '@shopify/hydrogen';
import {
  Image as ImageType,
  MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';

import SmartImage from '~/components/global/SmartImage';

type ProductCardProps = {
  title: string;
  money?: MoneyV2;
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
    <div className=" bg-custom-placeholder-green rounded-sm group relative aspect-square cursor-pointer basic-animation shadow-sm  hover:opacity-90">
      <SmartImage image={img} alt={img.altText ?? title} />
      {extraLabel && (
        <div className="absolute top-0 right-0 p-4">
          <p className="text-custom-white w-fit text-xs lg:text-md capitalize ">
            {extraLabel}
          </p>
        </div>
      )}
      <div className="text-custom-white transition-colors delay-75 ease-in-out group-hover:text-white absolute bottom-0 w-full">
        <div className="grid grid-cols-1 text-sm md:text-md lg:text-lg p-4  ">
          <p className=" font-semibold text-autoscale">{title}</p>
          {money && (
            <Money
              className="text-autoscale-small"
              withoutTrailingZeros
              data={money}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
