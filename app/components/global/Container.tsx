import clsx from 'clsx';
import React from "react"

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  padding?: boolean
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as = 'div',
  padding = true,
}) => {
  const style = clsx(
    `w-full  max-w-wrapper mx-auto `,
    padding && 'p-4 sm: px-6 md:px-8 lg:px-12',
    className,
  );

  return React.createElement(as, {className: style}, children);
};

export const NoWrapContainer: React.FC<ContainerProps> = ({
  children,
  className = '',
  as = "div",
}) => {
  const style = clsx(
    `w-full mx-auto `,
    'p-4 sm:px-6 md:px-8 lg:px-12',
    className,
  );

  return React.createElement(as, {className: style}, children);
};
export default Container;
