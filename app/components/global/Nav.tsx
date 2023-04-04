import {Link} from '@remix-run/react';
import clsx from 'clsx';
import {ComponentProps} from 'react';

type Props = {
  flexDirection: 'col' | 'row';
  className?: string;
};

const Nav: React.FC<Props & ComponentProps<'nav'>> = ({
  flexDirection,
  className,
}: Props) => {
  //in Header.tsx, if we're past the lg(1024px) breakpoint, we want to show our navbar
  //but if the viewport is smaller than that, e.g.: mobiles or tablets, we want to hide it, and our NavSidebar will play the navbar role
  return (
    <nav
      className={clsx(
        flexDirection === 'row' ? 'hidden lg:block' : '',
        className,
      )}
    >
      <ul
        className={clsx(
          'w-fit h-fit flex',
          flexDirection === 'row'
            ? ' items-center text-md lg:text-md lg:gap-x-14 xl:gap-x-11 '
            : ' flex-col items-start justify-center gap-y-12 text-xl ',
        )}
      >
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/">
            home
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/shop">
            shop
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/about">
            about
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/contact">
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
