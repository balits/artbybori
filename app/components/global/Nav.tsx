import {Link} from '@remix-run/react';

export default function Nav({flexDirection}: {flexDirection: 'row' | 'col'}) {
  const hideNavbar = flexDirection === 'row' ? 'hidden lg:block' : '';
  //in Header.tsx, if we're past the lg(1024px) breakpoint, we want to show our navbar
  //but if the viewport is smaller than that, e.g.: mobiles or tablets, we want to hide it, and our NavSidebar will play the navbar role
  let style = ' w-fit h-fit flex ';
  if (flexDirection === 'row') {
    style += ' items-center text-md lg:text-md lg:gap-x-14 xl:gap-x-11 ';
  } else {
    style += ' flex-col items-start justify-center gap-y-12 text-xl ';
  }

  return (
    <nav className={hideNavbar}>
      <ul className={style}>
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
}
