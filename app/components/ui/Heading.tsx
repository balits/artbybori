import clsx from 'clsx';

import {missingClass, formatText} from '~/lib/utils';

export function MyHeading({
  as: Component = 'h2',
  children,
  className = '',
  format,
  font = "font-cantata",
  bold = false,
  size =  'medium',
  ...props
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  format?: boolean;
  size?: 'small' | 'medium' | 'large',
  font?: "font-sans" | "font-cantata",
  bold?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const sizes = {
    small: "tracking-tight text-custom-black",
    medium: "tracking-tight text-custom-black text-3xl md:text-4xl lg:text-5xl mb-4 lg:mb-8",
    large: ""
  }

  const styles = clsx(
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    missingClass(className, 'font-') && sizes[size],
    font,
    bold && "font-semibold",
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}
