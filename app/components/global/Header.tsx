import { Form, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Container } from '~/components/global/Container';
import Logo from '~/components/global/Logo';
import Nav from '~/components/global/Nav';
import clsx from 'clsx';
import { useDrawer } from '../Drawer';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import CartDrawer from '~/components/drawer/CartDrawer';
import NavDrawer from '~/components/drawer/NavDrawer';
import { Link } from '../ui/Link';
import { Bars, SearchIcon } from './Icon';
import { CartCount } from "~/components/drawer/CartDrawer"

export default function Header() {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isNavOpen,
    openDrawer: openNav,
    closeDrawer: closeNav,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);


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
            <button
              onClick={openCart}
              className="p-2 md:p-3 lg:p-4 pr-0"
              aria-label="Open cart panel from the right side."
            >
              <CartCount />
            </button>
          </div>
        </Container>
      </header>
      <NavDrawer
        heading={<Logo onClick={closeNav} />}
        open={isNavOpen}
        onClose={closeNav}
        openFrom="left"
      />
      <CartDrawer
        heading="Cart"
        open={isCartOpen}
        onClose={closeCart}
        openFrom="right"
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
