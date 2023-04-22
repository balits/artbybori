import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

type Props = {
  as?: React.ElementType;
  to: string | undefined | null,
  className?: string;
  variant?: 'signature' | 'light' | 'dark' | "inline"
  width?: 'auto' | 'full';
  isDisabled: boolean
  [key: string]: any;
};

export const Button = forwardRef(
  (
    {
      as: Component = 'button',
      className = '',
      to,
      variant = 'light',
      width = 'auto',
      isDisabled = false,
      ...props
    }: Props,
    ref
  ) => {
    const baseButtonClasses =
      'inline-block rounded-md font-medium text-center py-3 px-6 ';

    const variants = {
      signature: " bg-custom-signature-green text-custom-white hover:opacity-80 active:opacity-90",
      light: " border border-custom-black bg-custom-white text-custom-black hover:bg-gray-100/50 active:bg-gray-100",
      dark: " border border-custom-black bg-custom-black text-custom-white hover:opacity-80 active:opacity-90",
      inline: "border-b border-custom-grey text-custom-black leading-none pb-1 hover:opacity-80 active:opacity-90",
    };

    const widths = {
      auto: 'w-auto',
      full: 'w-full',
    };

    const styles = clsx(
      baseButtonClasses,
      missingClass(className, 'bg-') && variants[variant],
      missingClass(className, 'w-') && widths[width],
      className,
      isDisabled && "cursor-not-allowed  text-red-500 border-red-400 bg-red-50 hover:bg-red-50 focus:outline-none active:bg-red-50",
    );

    return to ? (
      <Link
        to={to}
        className={styles}
        prefetch="intent"
        {...props}
      >
      </Link>
    ) : (
      <Component
        // @todo: not supported until react-router makes it into Remix.
        // preventScrollReset={true}
        className={styles}
        {...props}
        ref={ref}
      />
    )
  },
);

