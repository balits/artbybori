import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

type Props = {
  as?: React.ElementType;
  to?: string,
  className?: string;
  variant?: 'signature' | 'light' | 'dark' | "inline"
  width?: 'auto' | 'full';
  [key: string]: any;
};

export const Button = forwardRef(
  (
    {
      as = 'button',
      className = '',
      to,
      variant = 'light',
      width = 'auto',
      ...props
    }: Props,
    ref
  ) => {
    const Component = props?.to ? Link : as;

    const baseButtonClasses =
      'inline-block rounded-md font-medium text-center py-3 px-6 hover:opacity-80 active:opacity-90';

    const variants = {
      signature: " bg-custom-signature-green text-custom-white",
      light: " border border-custom-black bg-custom-white text-custom-black",
      dark: " border border-custom-black bg-custom-black text-custom-white",
      inline: "border-b border- leading-none pb-1",
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
    );

    return (
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

