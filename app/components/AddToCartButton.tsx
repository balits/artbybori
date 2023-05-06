import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {useFetcher, useMatches} from '@remix-run/react';
import {CartAction} from '~/lib/type';
import clsx from 'clsx';
import {Button, ButtonProps} from "~/components/ui"
import { useCartFetchers } from '~/hooks/useCartFetchers';
import { Spinner } from './global/Icon';

export function AddToCartButton({
  variant = "light",
  lines,
  className = '',
  width = 'full',
  disabled,
  analytics,
  ...props
}: {
  variant?: ButtonProps['variant']
  lines: CartLineInput[];
  className?: string;
  width?: 'auto' | 'full';
  disabled?: boolean;
  analytics?: unknown;
  [key: string]: any;
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const fetcherIsNotIdle = fetcher.state !== 'idle';

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="countryCode" value={selectedLocale.country} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <Button
        type="submit"
        variant={variant}
        width={width}
        className={clsx(
          className,
          disabled || fetcherIsNotIdle
            ? 'cursor-not-allowed'
            : 'cursor-pointer',
        )}
        disabled={disabled ?? fetcherIsNotIdle}
        {...props}
      >
        {disabled || fetcherIsNotIdle ? <span className='inline-flex text-white items-center gap-x-3'><Spinner className='text-white'/>{' '}Adding</span> : "Add to Cart"}

      </Button>
    </fetcher.Form>
  );
}
