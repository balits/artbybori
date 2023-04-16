<<<<<<< HEAD
import clsx from 'clsx';
import {ComponentProps} from 'react';
import { Link } from '../Link';
=======
import {Link} from '@remix-run/react';
import clsx from 'clsx';
import {ComponentProps} from 'react';
>>>>>>> refs/remotes/origin/main

type Props = {
  flexDirection: 'col' | 'row';
  className?: string;
  closeSidebarOnClick?: () => void;
};

<<<<<<< HEAD
  //in Header.tsx, if we're past the lg(1024px) breakpoint, we want to show our navbar
  //but if the viewport is smaller than that, e.g.: mobiles or tablets, we want to hide it, and our NavSidebar will play the navbar role
=======
>>>>>>> refs/remotes/origin/main
const Nav: React.FC<Props & ComponentProps<'nav'>> = ({
  flexDirection,
  className,
  closeSidebarOnClick,
}: Props) => {
<<<<<<< HEAD

=======
  //in Header.tsx, if we're past the lg(1024px) breakpoint, we want to show our navbar
  //but if the viewport is smaller than that, e.g.: mobiles or tablets, we want to hide it, and our NavSidebar will play the navbar role
>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
          <Link prefetch="intent" to="/"  onClick={closeSidebarOnClick}>
=======
          <Link prefetch="intent" to="/" onClick={closeSidebarOnClick}>
>>>>>>> refs/remotes/origin/main
            home
          </Link>
        </li>
        <li className="cursor-pointer  hover:opacity-80 active:opacity-80">
<<<<<<< HEAD
          <Link prefetch="intent" to="/shop"  onClick={closeSidebarOnClick}>
=======
          <Link prefetch="intent" to="/shop" onClick={closeSidebarOnClick}>
>>>>>>> refs/remotes/origin/main
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
