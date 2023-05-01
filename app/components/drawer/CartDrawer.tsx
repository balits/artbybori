import { Drawer, DrawerProps } from '~/components/Drawer';
import { Await, useMatches } from '@remix-run/react';
import { Cart, CartLine } from '@shopify/hydrogen/storefront-api-types';
import { flattenConnection, Image } from '@shopify/hydrogen';
import { Suspense, useMemo } from 'react';
import { Link, Button, Text, MyMoney } from '../ui';
import { HiArrowPath } from 'react-icons/hi2';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { RemoveItem, DecrementQuantity, IncrementQuantity } from "~/components/cart/CartView"
import { Check, XCirlce } from '../global/Icon';

function Empty({
  closeDrawer
}: {
  closeDrawer: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-center text-lg mb-2'>
        Your cart seems empty.
      </p>
      <div>
        <Link onClick={closeDrawer} prefetch="intent" to="/shop" className="underline decoration-offset-2">
          Browse our products
        </Link>
        &nbsp;or<br />
        <Link onClick={closeDrawer} prefetch="intent" to="/search" className="underline decoration-offset-2">
          Search up on our catalog.
        </Link>
      </div>
    </div>
  );
}

function Fallback() {
  return (
    <div className="w-full h-full grid place-items-center">
      <HiArrowPath className="w-5 h-5 animate-spin" />
    </div>
  );
}

/*
 * A reexport of `Drawer` that slides in from the left and displays informations about the current Cart
 * Uses the same `DrawerProps` type as the `Drawer` itself.
 * */
export default function CartDrawer({
  heading,
  open,
  onClose,
  openFrom,
}: DrawerProps) {
  const [root] = useMatches();

  return (
    <Drawer heading={heading} open={open} onClose={onClose} openFrom={openFrom}>
      <Suspense fallback={<Fallback />}>
        <Await resolve={root.data?.cart}>
          {(cart) => <CartSidebarView cart={cart} closeDrawer={onClose} />}
        </Await>
      </Suspense>
    </Drawer>
  );
}

function CartSidebarView({
  cart,
  closeDrawer,
}: {
  cart: Cart;
  closeDrawer: () => void;
}) {
  const lines = cart?.lines ? flattenConnection(cart.lines) : [];

  return lines.length > 0 ? (
    <section className="h-full px-4 relative flex flex-col items-center justify-between">
      <ul className="h-full overflow-auto w-full flex flex-col items-start pb-8 divide-y divide-custom-placeholder-green pr-2">
        {lines.map(
          (l) =>
            l.id && (
              <li key={l.id} className="h-fit w-full py-8">
                <CartLineItem cartLine={l} closeDrawer={closeDrawer}/>
              </li>
            )
        )}
      </ul>
      <div className="flex-shink-0 w-full my-2 flex flex-col mb-4">
        <Button
          onClick={closeDrawer}
          variant="signature"
          to="/cart"
        >
          View cart
        </Button>
      </div>
    </section>
  ) : (
    <section className='w-full h-full px-4 flex items-center justify-center'>
      <Empty closeDrawer={closeDrawer} />
    </section>
  )
}

function CartLineItem({ cartLine, closeDrawer }: { cartLine: CartLine, closeDrawer: () => void }) {
  const { id, quantity: qty, merchandise: variant } = cartLine;
  const product = variant.product;

  const prevQuantity = Number(Math.max(0, qty - 1).toFixed(0));
  const nextQuantity = Number((qty + 1).toFixed(0));

  return (
    <div className="w-full  grid grid-cols-3 grid-rows-1 gap-x-4">
      <Link to={`/products/${product.handle}`} prefetch="intent" onClick={closeDrawer} className="col-span-1">
        {variant.image && (
          <Image
            className="overflow-hidden card-image object-cover object-center absolute w-full h-full"
            data={variant.image}
            alt={product.title}
            loading="lazy"
            sizes="100%"
          />
        )}
      </Link>

      <div className="col-span-2 w-full  flex flex-col items-start justify-between">
        <div className='w-full flex flex-col items-start justify-start gap-y-2'>
          <div className='w-full flex items-center justify-between'>
            <Link to={`/products/${product.handle}`} prefetch="intent" onClick={closeDrawer}>
              <Text size='md' bold>{product.title}</Text>
            </Link>
            {cartLine.cost.totalAmount && (
                <MyMoney
                  data={cartLine.cost.totalAmount}
                  as="span"
                  size='md'
                />
            )}
          </div>

          <ul className="flex flex-col gap-y-1">
            {variant.selectedOptions.filter(o => o.name.toLowerCase() != "title").map((option) => (
              <li key={option.name} >
                <Text size='sm' color='lightgrey' className='capitalize'>
                  {option.value}
                </Text>
              </li>
            ))}
          </ul>

            {variant.availableForSale ? (
              <div className='mt-4 flex items-center gap-x-3'>
                <Check className='text-green-400' />
                <Text size='sm'>In stock</Text>
              </div>
            ) : (
              <div className='mt-4 flex items-center gap-x-3'>
                <XCirlce className='text-red-400' />
                <Text size='sm'>Out of stock</Text>
              </div>
            )}
        </div>

        <div className='w-full'>
          <div className="flex items-start justify-between">
            <label htmlFor={`quantity-${id}`} className="sr-only">
              Quantity, {qty}
            </label>
            <div className="flex items-center justify-center">
              <DecrementQuantity
                id={id}
                quantity={prevQuantity}
                disabled={qty <= 1}
              />
              <Text className="p-2 w-full h-full grid  place-items-center">
                {qty}
              </Text>
              <IncrementQuantity
                id={id}
                quantity={nextQuantity}
                disabled={false}
              />
            </div>

            <RemoveItem itemID={id} />

          </div>
        </div>
      </div>

    </div>
  );
}


function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <div
          className={`${dark
            ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
            : 'text-contrast bg-primary'
            } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}
