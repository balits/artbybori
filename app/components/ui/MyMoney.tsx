import React from "react"
import {Money, useMoney} from "@shopify/hydrogen"
import { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"

type Props = {
  as?: React.ElementType
  data: MoneyV2,
  className?: string
}

export function MyMoney({
  as:Component = "span",
  data,
  className,
  ...props
}: Props) {
  const {currencyNarrowSymbol} = useMoney(data)
  return <Component {...props} className="inline-flex gap-1">
   <Money className={className} data={data} withoutCurrency withoutTrailingZeros />
    <span className={className}>{currencyNarrowSymbol}</span>
  </Component>
}
