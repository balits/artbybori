import React, { useState } from "react"

import type {
  FilterType,
  Filter,
  Collection,
} from '@shopify/hydrogen/storefront-api-types';

import {
  AppliedFilter,
  SortParam,
} from "~/routes/($lang)/collections/$collectionHandle"
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Link } from "@remix-run/react";
import clsx from "clsx";

type Props = {
  filters: Filter[];
  appliedFilters?: AppliedFilter[];
  children?: React.ReactNode;
  collections?: Collection[];
};

export default function FilteredGrid({
  filters,
  appliedFilters = [],
  children,
  collections = [],
}: Props) {

  const [open, setOpen] = useState(false)

  return (
    <section>
      <div>
        <h1>Collection&nbsp;Title</h1>
        <p>This is a dummy description</p>
      </div>

      <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <HiAdjustmentsHorizontal className="h-4 w-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </div>
        <div>
          Active filter: Kaki
        </div>
      </div>
        <aside id="filters-dropdown" >
            filtes.....
        </aside>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-3 md:gap-y-8 md:gap-x-4 lg:gap-y-12 lg:gap-x-6">
        {collections.map(coll => (
          <li key={coll.id}>
            <Link to={`/categories/${coll.handle}`}>
              <div className="w-full aspect-[6/4] bg-custom-placeholder-green">
                {coll.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section >
  )
}
