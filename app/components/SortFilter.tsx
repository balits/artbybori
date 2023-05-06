import {Fragment,  useEffect,  useState} from 'react';
import {Menu, Transition} from '@headlessui/react';

import { Text} from '~/components/ui';
import {
  Link,
  useLocation,
  useSearchParams,
  Location,
} from '@remix-run/react';
import {Disclosure} from '@headlessui/react';

import type {
  FilterType,
  Filter,
  Collection,
} from '@shopify/hydrogen/storefront-api-types';
import {
  AppliedFilter,
  SortParam,
} from '~/routes/($lang)/categories/$categoryHandle';
import FiltersDrawer from '~/components/drawer/FiltersDrawer';
import { Bars, Filter as FilterIcon } from './global/Icon';
import { HiChevronDown } from 'react-icons/hi';

type Props = {
  filters: Filter[];
  appliedFilters?: AppliedFilter[];
  children: React.ReactNode;
  collections?: Collection[];
};

export function SortFilter({
  filters,
  appliedFilters = [],
  children,
  collections = [],
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open)

  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <button
          onClick={toggle}
          className={
            'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5'
          }
          aria-role="Open Filter as a sidebar from the left."
        >
          <Bars />
        </button>
        <SortMenuDropdown />
      </div>
      <div className="flex flex-col flex-wrap md:flex-row">
          <FiltersDrawer
            collections={collections}
            filters={filters}
            appliedFilters={appliedFilters}
            open={open}
            openFrom="left"
            onClose={toggle}
            heading="Filters"
          />
        </div>
        <div className="flex-1">
          {children}
        </div>
    </>
  )

}


function getSortLink(
  sort: SortParam,
  params: URLSearchParams,
  location: Location,
) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}




export default function SortMenuDropdown() {
  const items: {label: string; key: SortParam}[] = [
    {label: 'Featured', key: 'featured'},
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get('sort')) ?? items[0];

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div className='flex gap-x-2 items-center w-fit'>
        <Menu.Button className="group capitalize inline-flex items-center justify-center gap-x-1.5 bg-custom-white px-3 py-2 text-gray-900">

          <Text as="span" color='grey' className='group-hover:text-custom-lightgrey'>
            Sort by: <span>{activeItem?.label}
            </span>
          </Text>
          <HiChevronDown className='group-hover:text-custom-lightgrey'/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="nav"
          className="w-40 z-10 absolute right-0 flex flex-col text-right rounded-sm mt-2 bg-custom-white shadow-sm"
        >
          {items.map((item) => (
            <Menu.Item key={item.label}>
              {({active}) => (
                <Link
                  className={`block text-sm py-2 px-4 w-full  ${ activeItem?.key === item.key ? 'font-bold' : '' } ${active ? "bg-custom-signature-green opacity-80 text-custom-white" : ""}`}
                  to={getSortLink(item.key, params, location)}
                >
                  {item.label}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
