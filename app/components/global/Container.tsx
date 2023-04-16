import clsx from 'clsx';
<<<<<<< HEAD
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
  as = "div",
=======

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  padding?: boolean;
};

const Container: React.FC<Props> = ({
  children,
  className = '',
  as = 'div',
>>>>>>> refs/remotes/origin/main
  padding = true,
}) => {
  const style = clsx(
    `w-full  max-w-wrapper mx-auto `,
    padding && 'px-6',
    className,
  );

<<<<<<< HEAD
  return React.createElement(as, {className: style}, children);
};

export const NoWrapContainer: React.FC<ContainerProps> = ({
  children,
  className = '',
  as = "div",
}) => {
  const style = clsx(
    `w-full mx-auto `,
    'px-6 md:px-8 lg:px-12',
    className,
  );

  return React.createElement(as, {className: style}, children);
};
=======
  return <div className={style}>{children}</div>;
};
export default Container;
>>>>>>> refs/remotes/origin/main
