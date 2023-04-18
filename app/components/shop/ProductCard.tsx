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
  textOnTop?: boolean
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  money,
  img,
  extraLabel,
  textOnTop = false,
}) => {
  return (
    <>
      <div className="bg-custom-placeholder-green rounded-sm group relative aspect-square cursor-pointer basic-animation shadow-sm  hover:opacity-90">
        <SmartImage image={img} alt={img.altText ?? title} className="w-full" loading='eager'/>
        {extraLabel && (
          <div className="absolute top-0 right-0 p-4">
            <p className="text-custom-white w-fit text-xs lg:text-md capitalize">
              {extraLabel}
            </p>
          </div>
        )}
        {
          textOnTop && <div className="text-custom-white transition-colors delay-75 ease-in-out group-hover:text-white absolute bottom-0 w-full">
            <div className="grid grid-cols-1 p-4  ">
              <p className=" font-semibold text-autoscale">{title}</p>
              {money &&  (
                <Money
                  className="text-autoscale-small"
                  withoutTrailingZeros
                  data={money}
                />
              )}
            </div>
          </div>
        }
      </div>
      {!textOnTop && (
        <div className="grid grid-cols-1 mt-2 md:mt-3 lg:mt-4">
          <p className=" font-medium text-sm md:text-md xl:text-lg">{title}</p>
          {money &&  (
            <Money
              className="text-xs md:text-sm xl:text-md"
              withoutTrailingZeros
              data={money}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ProductCard;
