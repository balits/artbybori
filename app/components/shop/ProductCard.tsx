import { Image } from '@shopify/hydrogen';
import {
  Image as ImageType,
  MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';

import SmartImage from '~/components/global/SmartImage';
import { MyMoney, Text, TextProp } from '../ui';

export type ExtraLabel = "sale" | "new" | "sold out" | ""

type ProductCardProps = {
  /** title the title of the variant*/
  title: string;
  /** the price of the variant (compare Price to be implemented)*/
  money?: MoneyV2;
  /** the price of the variant (compare Price to be implemented)*/
  img: ImageType;
  /** extra info associated with the Variant*/
  extraLabel?: ExtraLabel;
  /** wether to display the details on top of the image or below it*/
  textOnTop: boolean;
  /** discounted price*/
  compareAtPrice?: MoneyV2
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  money,
  img,
  extraLabel,
  textOnTop = true,
  compareAtPrice,
}) => {
  return (
    <>
      <div className="bg-custom-placeholder-green rounded-md group relative aspect-[4/5] cursor-pointer basic-animation delay-0 shadow-sm  ">
        <div className='aspect-[4/5] relative flex items-center justify-center overflow-clip rounded-md'>
          <Image
            className='aspect-[4/5] w-full object-cover fadeIn card-scale-hover'
            widths={[400]}
            loaderOptions={{
              crop:'center',
              scale:2,
              width:400,
              height: 600,
            }}
            data={img}
            alt={img.altText ?? title}
            loading="eager"
          />
        </div>
        {extraLabel && (
          <div className="absolute top-0 right-0 p-3 lg:p-4">
            <span className={`${extraLabel === "sold out" ? "text-red-300 " : "text-custom-white" } w-fit text-xs md:text-sm lg:text-md capitalize`}>
              {extraLabel}
            </span>
          </div>
        )}
        {textOnTop && (
          <div className="p-3 md:p-6  basic-animation group-hover:text-white absolute bottom-0 w-full">
            <Details title={title} money={money} color="white" compareAtPrice={compareAtPrice}/>
          </div>
        )}
      </div>
      {!textOnTop && <Details title={title} money={money} color="black"  compareAtPrice={compareAtPrice}/>}
    </>
  );
};
export default ProductCard;

function Details({
  title,
  money,
  color,
  compareAtPrice
}: {
    title: string
    money?: MoneyV2
    color: TextProp['color'],
    compareAtPrice?: MoneyV2
}) {

  return (
    <div className="grid gap-y-1 grid-cols-1 mt-2 lg:mt-4">
      <Text as="h3" color={color}>{title}</Text>
      {money && (
        <MyMoney
          data={money}
          compareAtPrice={compareAtPrice}
          color={color}
          size="lg"
        />
      )}
    </div>

  )
}
