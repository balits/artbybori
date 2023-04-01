import clsx from 'clsx';

export default function Container({
  children,
  className = '',
  as = 'div',
  padding = true,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  padding?: boolean;
}) {
  const style = clsx(
    `w-full  max-w-wrapper mx-auto `,
    padding && 'px-6',
    className,
  );

  return <div className={style}>{children}</div>;
}
