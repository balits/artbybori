import {Form, useParams} from '@remix-run/react';
import {useEffect, useState} from 'react';
import Container from '~/components/global/Container';
import Logo from '~/components/global/Logo';
import Nav from '~/components/global/Nav';
import {BiShoppingBag} from 'react-icons/bi';
import {HiBars2} from 'react-icons/hi2';
import clsx from 'clsx';
import {useDrawer} from '../Drawer';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import CartDrawer from '~/components/drawer/CartDrawer';
import NavDrawer from '~/components/drawer/NavDrawer';
import { HiSearch } from 'react-icons/hi';

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
          `transition-all transform-gpu  duration-500 ease-in-out fixed z-30 bg-custom-white w-full header-height`,
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
            <HiBars2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <Logo />
          <Nav flexDirection="row" />

          <div className='flex items-center gap-2'>
            <SearchBar />
            <button
              onClick={openCart}
              className="p-2 md:p-3 lg:p-4 pr-0"
              aria-label="Open cart panel from the right side."
            >
              <BiShoppingBag className="h-4 w-4 md:w-5 md:h-5 lg:w-6 lg:h-6 cursor-pointer" />
            </button>
          </div>
        </Container>
      </header>
      <NavDrawer
        heading={<Logo />}
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

function SearchBar() {
  const params = useParams();
  return (
    <Form
      method="get"
      action={params.lang ? `/${params.lang}/search` : '/search'}
      className="flex items-center gap-2"
    >
      <input
        className='focus:border-custom-black/10  px-2'
        type="search"
        placeholder="Search"
        name="q"
      />
      <button
        type="submit"
        className="p-2"
      >
        <HiSearch className='h-4 w-4 md:w-5 md:h-5  cursor-pointer focus:ring-custom-black'/>
      </button>
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
      if (dir !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
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
