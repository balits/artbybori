import { Disclosure } from "@headlessui/react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import type { Filter, Collection, FilterType } from "@shopify/hydrogen/storefront-api-types"
import { SyntheticEvent, useMemo, useState } from "react";
import { useDebounce, useLocation } from "react-use";
import { LocationSensorState } from "react-use/lib/useLocation";
import {
  AppliedFilter,
} from '~/routes/($lang)/categories/$categoryHandle';
import { Drawer, DrawerProps } from "../Drawer";
import { X, Plus, Minus } from "../global/Icon";
import { Link, Text } from "../ui";

type Props = {
  filters: Filter[];
  appliedFilters: AppliedFilter[];
  collections: Collection[];
  open: boolean;
  onClose: () => void
} & DrawerProps;

export default function FiltersDrawer({
  filters,
  appliedFilters,
  collections,
  open,
  onClose,
  heading
}: Props) {
  const [params] = useSearchParams();
  const location = useLocation();


  const filterMarkup = (filter: Filter, option: Filter['values'][0]) => {
    switch (filter.type) {
      case 'PRICE_RANGE':
        const min =
          params.has('minPrice') && !isNaN(Number(params.get('minPrice')))
            ? Number(params.get('minPrice'))
            : undefined;

        const max =
          params.has('maxPrice') && !isNaN(Number(params.get('maxPrice')))
            ? Number(params.get('maxPrice'))
            : undefined;

        return <PriceRangeFilter min={min} max={max} />;

      default:
        const to = getFilterLink(
          filter,
          option.input as string,
          params,
          location,
        );
        return (
          <Link
            className="focus:underline hover:underline"
            prefetch="intent"
            to={to}
          >
            {option.label}
          </Link>
        );
    }
  };

  const types = filters.find(f => f.label.toLowerCase() === "product type")

  return (
    <Drawer
      open={open}
      openFrom="left"
      onClose={onClose}
      heading={heading}
    >

      <div className="space-y-4 h-full w-full">
        {appliedFilters.length > 0 && <AppliedFilters filters={appliedFilters} />}

        <ul className="flex flex-col divide-y divide-custom-placeholder-green overflow-auto">
          {filters.map(
            (filter) =>  (
              filter.values.length > 1 && (
                <Disclosure as="li" key={filter.id} className="w-full py-4">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full ">
                        <Text size="lg" >{filter.label}</Text>
                        {open ? <Minus soft/> : <Plus soft/>}
                      </Disclosure.Button>

                      <Disclosure.Panel key={filter.id}>
                        <ul key={filter.id} className="mt-2 flex flex-col items-start justify-start gap-y-2">
                          {filter.values?.map((option) => {
                            return (
                              <Text as="li"  key={option.id} className="pl-4">
                                {filterMarkup(filter, option)}
                              </Text>
                            );
                          })}
                        </ul>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              )
            )
          )}
        </ul>
      </div>
    </Drawer>
  );
}


const PRICE_RANGE_FILTER_DEBOUNCE = 500;

function PriceRangeFilter({ max, min }: { max?: number; min?: number }) {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(min ? String(min) : '');
  const [maxPrice, setMaxPrice] = useState(max ? String(max) : '');

  useDebounce(
    () => {
      if (
        (minPrice === '' || minPrice === String(min)) &&
        (maxPrice === '' || maxPrice === String(max))
      )
        return;

      const price: { min?: string; max?: string } = {};
      if (minPrice !== '') price.min = minPrice;
      if (maxPrice !== '') price.max = maxPrice;

      const newParams = filterInputToParams('PRICE_RANGE', { price }, params);
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice],
  );

  const onChangeMax = (event: SyntheticEvent) => {
    const newMaxPrice = (event.target as HTMLInputElement).value;
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event: SyntheticEvent) => {
    const newMinPrice = (event.target as HTMLInputElement).value;
    setMinPrice(newMinPrice);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-4">
        <span>from</span>
        <input
          name="maxPrice"
          className="text-black"
          type="text"
          defaultValue={min}
          placeholder={'$'}
          onChange={onChangeMin}
        />
      </label>
      <label>
        <span>to</span>
        <input
          name="minPrice"
          className="text-black"
          type="number"
          defaultValue={max}
          placeholder={'$'}
          onChange={onChangeMax}
        />
      </label>
    </div>
  );
}

function filterInputToParams(
  type: FilterType,
  rawInput: string | Record<string, any>,
  params: URLSearchParams,
) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          params.set(key, value);
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        } else {
          const { name, value: val } = value as { name: string; value: string };
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}

function getFilterLink(
  filter: Filter,
  rawInput: string | Record<string, any>,
  params: URLSearchParams,
  location: ReturnType<typeof useLocation>,
) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}

function AppliedFilters({ filters = [] }: { filters: AppliedFilter[] }) {
  const [params] = useSearchParams();
  const location = useLocation();
  return (
    <div className="mb-6 flex flex-col gap-y-4 items-start justify-start">
      <Text as={"h4"} bold size="lg" className=" ">
        Applied&nbsp;filters
      </Text>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter: AppliedFilter) => {
          return (
            <Link
              to={getAppliedFilterLink(filter, params, location)}
              className="flex items-center px-3 py-1 border rounded-full gap-x-2 bg-custom-signature-green"
              key={`${filter.label}-${filter.urlParam}`}
            >
              <Text as={"span"} color="white" className="flex-grow ">{filter.label}</Text>
              <X className="text-custom-white hover:text-custom-white"/>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function getAppliedFilterLink(
  filter: AppliedFilter,
  params: URLSearchParams,
  location: LocationSensorState,
) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === 'variantOption') {
    const variantOptions = paramsClone.getAll('variantOption');
    const filteredVariantOptions = variantOptions.filter(
      (options) => !options.includes(filter.urlParam.value),
    );
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}
