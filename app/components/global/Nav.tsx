import {Link} from '@remix-run/react';
import clsx from 'clsx';
import {ComponentProps} from 'react';

type Props = {
  flexDirection: 'col' | 'row';
  className?: string;
  closeSidebarOnClick?: () => void;
};

const Nav: React.FC<Props & ComponentProps<'nav'>> = ({
  flexDirection,
  className,
  closeSidebarOnClick,
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
          <Link prefetch="intent" to="/" onClick={closeSidebarOnClick}>
            home
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/shop" onClick={closeSidebarOnClick}>
            shop
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/about" onClick={closeSidebarOnClick}>
            about
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/contact" onClick={closeSidebarOnClick}>
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
