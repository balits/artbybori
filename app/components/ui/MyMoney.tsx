import React from "react"
import {Money, useMoney} from "@shopify/hydrogen"
import { MoneyV2 } from "@shopify/hydrogen/storefront-api-types"
import clsx from "clsx"

type Props = {
  as?: React.ElementType
  data: MoneyV2,
  className?: string
}

export function MyMoney({
  as = "div",
  data,
  className,
  ...props
}: Props) {
  const {currencyNarrowSymbol} = useMoney(data)
  return <div className="flex gap-x-1">
    <Money as={as} className={clsx(className,"inline-flex gap-1")} data={data} withoutCurrency withoutTrailingZeros />
    <p className={className}>{currencyNarrowSymbol}</p>
  </div>
}
