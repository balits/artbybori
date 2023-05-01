import React from "react"
import {Money, useMoney} from "@shopify/hydrogen"
import { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import clsx from "clsx"
import { Text, TextProp } from "./Text"

type Props = {
  as?: React.ElementType
  data: MoneyV2,
  compareAtPrice?: MoneyV2 | undefined | null,
  className?: string,
  color?: TextProp['color'],
  size?: TextProp['size']
}

export function MyMoney({
  as = "span",
  data,
  compareAtPrice,
  color = "black",
  size = "md",
}: Props) {
  const {currencyNarrowSymbol} = useMoney(data)

  return (
    <div className="flex gap-x-3 items-center">
      <Text color={compareAtPrice ? "red" : color} size={size} as={"p"} bold className="flex gap-x-1 items-center">
        <Money
          as={as}
          className={clsx("inline-flex gap-1")}
          data={data}
          withoutCurrency
          withoutTrailingZeros
        />
        <span>{currencyNarrowSymbol}</span>
      </Text>
      {
        compareAtPrice && (
          <Text color={"lightgrey"} as="p" size={size}  className="">
            <Money
              as={as}
              className={clsx("line-through")}
              data={compareAtPrice}
              withoutCurrency
              withoutTrailingZeros
            />
            <span className="line-through">{currencyNarrowSymbol}</span>
          </Text>
        )
      }
    </div>
  )
}
