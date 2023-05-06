import { Await, Form, useMatches, useParams } from '@remix-run/react';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Container } from '~/components/global/Container';
import Logo from '~/components/global/Logo';
import Nav from '~/components/global/Nav';
import clsx from 'clsx';
import { useDrawer } from '../Drawer';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import NavDrawer from '~/components/drawer/NavDrawer';
import { Link } from '../ui/Link';
import { Bars, SearchIcon, ShoppingBag } from './Icon';
import { useIsHydrated } from '~/hooks/useIsHydrated';

export default function Header() {
  const {
    isOpen: isNavOpen,
    openDrawer: openNav,
    closeDrawer: closeNav,
  } = useDrawer();




  const scrollDirection = useScroll();

  return (
    <>
      <header
        className={clsx(
          `transition-all transform-gpu  duration-300 ease-in-out fixed z-30 bg-custom-white w-full header-height`,
          scrollDirection === 'down'
            ? '-top-header-base md:-top-header-md lg:-top-header-lg'
            : 'top-0',
        )}
      >
        <Container className="flex items-center justify-between h-full">
          <button
            onClick={openNav}
            className="lg:hidden p-2 md:p-3 lg:p-4 pl-0"
            aria-label="Open navigation panel from the left side."
          >
            <Bars />
          </button>
          <Logo />
          <Nav flexDirection="row" />

          <div className='flex items-center justify-center gap-2 sm:gap-4 md:gap-6'>
            <SearchBar className="hidden lg:flex" />

            <Link to="/search?q=" aria-label='Go to search page' className="lg:hidden p-2 md:p-3 lg:p-4 ">
              <SearchIcon />
            </Link>

              <Link
                to="/cart"
                prefetch='intent'
                className="p-2 md:p-3 lg:p-4 pr-0"
              >
                <CartCount />
              </Link>
          </div>
        </Container>
      </header>

      <NavDrawer
        heading={<Logo onClick={closeNav} />}
        open={isNavOpen}
        onClose={closeNav}
        openFrom="left"
      />


    </>
  );
}


function SearchBar({ className }: { className: string }) {
  const params = useParams();
  return (
    <Form
      method="get"
      action={params.lang ? `/${params.lang}/search` : '/search'}
    >
      <div
        className={clsx("flex items-center gap-2", className)}
      >

        <input
          className='focus:border-custom-signature  p-2 md:p-3'
          type="search"
          placeholder="Search"
          name="q"
        />
        <button
          type="submit"
          aria-label='Apply search and go to search page'
          className="p-2 md:p-3 lg:p-4 "
        >
          <SearchIcon />
        </button>
      </div>
    </Form>
  );
}

function useScroll() {
  const [scrollDirection, setScrollDirecion] = useState<'down' | 'up' | null>(
    null,
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const dir = scrollY > lastScrollY ? 'down' : 'up';
      if (dir !== scrollDirection && Math.abs(scrollY - lastScrollY) > 7) {
        setScrollDirecion(dir);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}


export function CartCount() {
  const [root] = useMatches();

  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <CartBadge
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}





function CartBadge({
  count,
}: {
  count: number;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <div className='relative'>
        <ShoppingBag />
        <div
          className=' absolute -bottom-3 -right-3 text-custom-white bg-black w-5 h-5 rounded-full flex items-center justify-center'
        >
          <span className='text-xs'>{count || 0}</span>
        </div>
      </div>
    ),
    [count],
  );

  return isHydrated ? (
    <div
      className="relative flex items-center justify-center w-8 h-8 focus:ring-custom-lightgrey/5"
    >
      {BadgeCounter}
    </div>
  ) : (
    <div
      className="relative flex items-center justify-center w-8 h-8 focus:ring-custom-lightgrey/5"
    >
      {BadgeCounter}
    </div>
  );
}
