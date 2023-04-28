import React from "react"
import {Money, useMoney} from "@shopify/hydrogen"
import { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import clsx from "clsx"
import { Text, TextProp } from "./Text"

type Props = {
  as?: React.ElementType
  data: MoneyV2,
  compareAtPrice: MoneyV2 | undefined | null,
  className?: string,
  color?: TextProp['color']
}

export function MyMoney({
  as = "span",
  data,
  compareAtPrice,
  color = "black",
}: Props) {
  const {currencyNarrowSymbol} = useMoney(data)

  return (
    <div className="flex gap-x-3 items-center">
      <Text color={compareAtPrice ? "red" : color} size="lg" as={"p"} bold className="flex gap-x-1 items-center">
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
          <Text color={"lightgrey"} as="p" size="lg"  className=" flex gap-x-1 items-center ">
            <Money
              as={as}
              className={clsx("inline-flex gap-1")}
              data={compareAtPrice}
              withoutCurrency
              withoutTrailingZeros
            />
            <span>{currencyNarrowSymbol}</span>
          </Text>
        )
      }
    </div>
  )
}
