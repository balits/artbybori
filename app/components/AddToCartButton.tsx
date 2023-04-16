import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {useFetcher, useMatches, useNavigation} from '@remix-run/react';
import {Button} from '~/components';
import {CartAction} from '~/lib/type';
import clsx from 'clsx';
<<<<<<< HEAD
import MyButton from "~/components/global/Button"

export function AddToCartButton({
  variant = "white",
  children,
  lines,
  className = '',
=======

export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
>>>>>>> refs/remotes/origin/main
  width = 'full',
  disabled,
  analytics,
  ...props
}: {
<<<<<<< HEAD
  variant?: "white" | "black" | "signature"
  children: React.ReactNode;
  lines: CartLineInput[];
  className?: string;
=======
  children: React.ReactNode;
  lines: CartLineInput[];
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
      <MyButton
        variant={variant}
        type="submit"
        className={clsx(
          ' font-semibold py-2 px-8 border border-custom-black',
=======
      <button
        type="submit"
        className={clsx(
          'text-autoscale-big font-semibold py-2 px-8 border border-custom-black',
>>>>>>> refs/remotes/origin/main
          className,
          disabled || fetcherIsNotIdle
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer',
        )}
        disabled={disabled ?? fetcherIsNotIdle}
        {...props}
      >
        {children}
<<<<<<< HEAD
      </MyButton>
=======
      </button>
>>>>>>> refs/remotes/origin/main
    </fetcher.Form>
  );
}
