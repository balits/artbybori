import clsx from 'clsx';

import {missingClass, formatText} from '~/lib/utils';

export type TextProp = {
  as?: React.ElementType;
  className?: string;
  color?: 'black' | 'white' | 'grey' | 'lightgrey' | 'signature' | "red" ,
  format?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'default' | 'narrow' | 'wide';
  children: React.ReactNode;
  bold?: boolean
  [key: string]: any;
}

export function Text({
  as: Component = 'p',
  className,
  color = 'black',
  format,
  size = 'md',
  width = 'default',
  bold = false,
  children,
  ...props
}: TextProp) {
  const colors: Record<string, string> = {
    default: 'text-custom-black',
    grey: 'text-custom-grey',
    white: 'text-custom-white',
    lightgrey: 'text-custom-lightgrey',
    signature: 'text-custom-signature',
    red: 'text-red-400'
  };

  const sizes: Record<string, string> = {
    sm: 'text-xs md:text-sm antialiased',
    md: 'text-sm md:text-md antialiased',
    lg: 'text-md md:text-lg antialiased',
    xl: 'text-lg md:text-2xl antialiased',
  };

  const widths: Record<string, string> = {
    default: 'max-w-prose',
    narrow: 'max-w-prose-narrow',
    wide: 'max-w-prose-wide',
  };

  const styles = clsx(
    missingClass(className, 'max-w-') && widths[width],
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    colors[color],
    sizes[size],
    bold && "font-semibold",
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

type HeadingProp = {
  as?: React.ElementType;
  color?: TextProp['color']
  children?: React.ReactNode;
  format?: boolean;
  size?: 'sm' | 'md' | 'lg',
  font?: "font-sans" | "font-cantata",
  bold?: boolean
}& React.HTMLAttributes<HTMLHeadingElement>

export function Heading({
  as: Component = 'h2',
  children,
  className = '',
  format,
  font = "font-cantata",
  size = 'md',
  color = "black",
  bold,
  ...props
}: HeadingProp) {
  const sizes = {
    sm: "text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 lg:mb-4",
    md: "tracking-tight text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 lg:mb-8",
    lg: "tacking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-8 lg:mb-12",
  }

  const colors: Record<string, string> = {
    default: 'text-custom-black',
    grey: 'text-custom-grey',
    white: 'text-custom-white',
    lightgrey: 'text-custom-lightgrey',
    signature: 'text-custom-signature',
  };


  const styles = clsx(
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    sizes[size],
    colors[color],
    bold && "font-semibold",
    font,
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

export function Section({
  as: Component = 'section',
  children,
  className,
  divider = 'none',
  display = 'grid',
  heading,
  padding = 'all',
  ...props
}: {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  divider?: 'none' | 'top' | 'bottom' | 'both';
  display?: 'grid' | 'flex';
  heading?: string;
  padding?: 'x' | 'y' | 'swimlane' | 'all';
  [key: string]: any;
}) {
  const paddings = {
    x: 'px-6 md:px-8 lg:px-12',
    y: 'py-6 md:py-8 lg:py-12',
    swimlane: 'pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8',
    all: 'p-6 md:p-8 lg:p-12',
  };

  const dividers = {
    none: 'border-none',
    top: 'border-t border-primary/05',
    bottom: 'border-b border-primary/05',
    both: 'border-y border-primary/05',
  };

  const displays = {
    flex: 'flex',
    grid: 'grid',
  };

  const styles = clsx(
    'w-full gap-4 md:gap-8',
    displays[display],
    missingClass(className, '\\mp[xy]?-') && paddings[padding],
    dividers[divider],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {heading && (
        <Heading size="md" className={padding === 'y' ? paddings['x'] : ''}>
          {heading}
        </Heading>
      )}
      {children}
    </Component>
  );
}
