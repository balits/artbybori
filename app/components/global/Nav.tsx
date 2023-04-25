import clsx from 'clsx';
import {ComponentProps} from 'react';
import { Link } from '../ui/Link';

type Props = {
  flexDirection: 'col' | 'row';
  className?: string;
  closeSidebarOnClick?: () => void;
};

/***
* in Header.tsx, if we're past the lg(1024px) breakpoint, we want to show our navbar
* but if the viewport is smaller than that, e.g.: mobiles or tablets, we want to hide it, and our NavSidebar will play the navbar role
* */
const Nav: React.FC<Props & ComponentProps<'nav'>> = ({
  flexDirection,
  className,
  closeSidebarOnClick,
}: Props) => {
  return (
    <nav
      className={clsx(
        flexDirection === 'row' ? 'hidden lg:block' : '',
        className,
      )}
    >
      <ul
        className={clsx(
          'w-fit h-fit flex ',
          flexDirection === 'row'
            ? ' items-center   lg:gap-x-14 xl:gap-x-11 '
            : ' flex-col items-start justify-center gap-y-12 ',
        )}
      >
        <li className="cursor-pointer text-base hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/"  onClick={closeSidebarOnClick} className={flexDirection === "col" ? "text-xl" : ""}>
            home
          </Link>
        </li>
        <li className="cursor-pointer text-base hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/shop"  onClick={closeSidebarOnClick}  className={flexDirection === "col" ? "text-xl" : ""}>
            shop
          </Link>
        </li>
        <li className="cursor-pointer  text-base hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/about" onClick={closeSidebarOnClick} className={flexDirection === "col" ? "text-xl" : ""} >
            about
          </Link>
        </li>
        <li className="cursor-pointer text-base hover:opacity-80 active:opacity-80">
          <Link prefetch="intent" to="/contact" onClick={closeSidebarOnClick} className={flexDirection === "col" ? "text-xl" : ""}>
            contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
