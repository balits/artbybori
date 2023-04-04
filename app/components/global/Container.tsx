import clsx from 'clsx';

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
  padding = true,
}) => {
  const style = clsx(
    `w-full  max-w-wrapper mx-auto `,
    padding && 'px-6',
    className,
  );

  return <div className={style}>{children}</div>;
};
export default Container;
