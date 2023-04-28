import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {useFetcher, useMatches} from '@remix-run/react';
import {CartAction} from '~/lib/type';
import clsx from 'clsx';
import {Button, ButtonProps} from "~/components/ui"

export function AddToCartButton({
  variant = "light",
  children,
  lines,
  className = '',
  width = 'full',
  disabled,
  analytics,
  ...props
}: {
  variant?: ButtonProps['variant']
  children: React.ReactNode;
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
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer',
        )}
        disabled={disabled ?? fetcherIsNotIdle}
        {...props}
      >
        {children}
      </Button>
    </fetcher.Form>
  );
}
