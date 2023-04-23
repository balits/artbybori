import {
  Image as ImageType,
  MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';

import SmartImage from '~/components/global/SmartImage';
import { MyMoney, Text, TextProp } from '../ui';

export type ExtraLabel = "sale" | "new" | "sold out :(" | ""

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
  textOnTop: boolean
};

/**
* A Card that renders a ProductVariant with props in `ProductCardProps`.
* IMPORTANT: Please make sure to query the required fields for the product variant of your choise.
* @params {props} `ProductCardProps`
* */
const ProductCard: React.FC<ProductCardProps> = ({
  title,
  money,
  img,
  extraLabel,
  textOnTop,
}) => {
  return (
    <>
      <div className="bg-custom-placeholder-green rounded-md group relative aspect-square cursor-pointer basic-animation shadow-sm  hover:opacity-90">
        <SmartImage image={img} alt={img.altText ?? title} className="w-full rounded-md" loading='eager'/>
        {extraLabel && (
          <div className="absolute top-0 right-0 p-3 lg:p-4">
            <p className="text-custom-white w-fit text-xs md:text-sm lg:text-md capitalize">
              {extraLabel}
            </p>
          </div>
        )}
        {textOnTop && (
            <div className="p-2 md:p-3 lg:p-4  transition-colors delay-75 ease-in-out group-hover:text-white absolute bottom-0 w-full">
              <Details title={title} money={money} variant="white"/>
            </div>
          )}
      </div>
      {!textOnTop && <Details title={title} money={money} variant="black"/>}
    </>
  );
};
export default ProductCard;

function Details({
  title,
  money,
  variant
}: {
    title: string
    money?: MoneyV2
    variant: TextProp['color']
  }) {
  return (
    <div className="grid gap-y-1 grid-cols-1 mt-2 lg:mt-4">
      <Text as="h3" color={variant}>{title}</Text>
      {money &&  (
        <Text size='lg' as={"p"} color={variant} bold>
          <MyMoney
            as={"span"}
            data={money}
          />
        </Text>
      )}
    </div>

  )
}
