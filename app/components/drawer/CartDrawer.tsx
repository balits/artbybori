import { Drawer, DrawerProps } from '~/components/Drawer';
import { Await, useMatches } from '@remix-run/react';
import { Cart, CartLine } from '@shopify/hydrogen/storefront-api-types';
import { flattenConnection, Image } from '@shopify/hydrogen';
import { Fragment, Suspense, useMemo } from 'react';
import { Link, Button, Text, MyMoney, Heading } from '../ui';
import { HiArrowPath } from 'react-icons/hi2';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { RemoveItem, DecrementQuantity, IncrementQuantity, QuantitySection } from "~/components/cart/CartView"
import { Check, ShoppingBag, Spinner, X, XCirlce } from '../global/Icon';
import { Dialog, Transition } from '@headlessui/react';

function Empty({
  closeDrawer
}: {
  closeDrawer: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center mb-8'>
      <Text size='lg' bold className='text-center text-lg mb-4'>
        Your cart seems empty.
      </Text>
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
      <Spinner />
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
      <Suspense fallback={<Fallback />}>
        <Await resolve={root.data?.cart}>
          {(cart) =>(


          <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 left-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <aside aria-roledescription="sidebar" className="fixed inset-0">
                <div className="absolute inset-0 overflow-hidden ">
                  <div
                    className={`fixed h-screen flex  ${openFrom === 'right' ? 'right-0' : ''
                      }`}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-300"
                      enterFrom={'translate-x-full'}
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-300"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="overflow-hidden  h-screen w-screen md:w-[55vw] lg:w-[30vw] text-left align-middle transition-all transform shadow-md bg-custom-white p-4 pt-0 ">
                        <header className="bg-custom-white w-full header-height flex  items-center justify-between sticky top-0 justify-between z-[52]" >
                          <Dialog.Title>
                            <Heading
                              as="span"
                              size='sm'
                              font='font-sans'
                              bold
                              id="cart-contents"
                            >
                              {heading}
                            </Heading>
                          </Dialog.Title>
                          <button
                            type="button"
                            className="p-4 transition"
                            onClick={onClose}
                            data-test="close-cart"
                          >
                            <X aria-label="Close panel" className="w-5 h-5" />
                          </button>
                        </header>
                            <CartSidebarView cart={cart} closeDrawer={onClose} />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </aside>
            </Dialog>
          </Transition>
          )}
        </Await>
      </Suspense>
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
    <div className='z-[52] h-minus-header relative'>
      <section className="h-fit  bg-blue-500">
        <ul className="h-full overflow-auto w-full flex flex-col items-start divide-y divide-custom-placeholder-green">
          {lines.map(
            (l) =>
              l.id && (
                <li key={l.id} className="h-fit w-full py-6 ">
                  <CartLineItem cartLine={l} closeDrawer={closeDrawer} />
                </li>
              )
          )}
        </ul>
      </section>

      <div className='absolute bottom-0 h-16 w-full bg-white  z-[53] '>
        <Button
          onClick={closeDrawer}
          variant="signature"
          to="/cart"
          width="full"
        >
          View cart
        </Button>


      </div>

      {/* <div className="bottom-0 z-[52] bg-custom-white  w-full flex flex-col gap-4 items-center justify-center ">
        {cart.checkoutUrl && (
          <Button
            to={cart.checkoutUrl}
            width="full"
          >
            Check out
          </Button>
        )}
        <Button
          onClick={closeDrawer}
          variant="signature"
          to="/cart"
          width="full"
        >
          View cart
        </Button>
      </div> */}

    </div>
  ) : (
    <section className='w-full h-full px-4 flex items-center justify-center'>
      <Empty closeDrawer={closeDrawer} />
    </section>
  )
}

function CartLineItem({ cartLine, closeDrawer }: { cartLine: CartLine, closeDrawer: () => void }) {
  const { id, quantity: qty, merchandise: variant } = cartLine;
  const product = variant.product;

  return (
    <div className="w-full  grid grid-cols-3 grid-rows-1 gap-x-4 ">
      <Link to={`/products/${product.handle}`} prefetch="intent" onClick={closeDrawer} className="col-span-1">
        <div className='aspect-square w-full h-full relative bg-custom-placeholder-grey'>
          {variant.image && (
            <Image
              className="card-image object-cover object-center aspect-square w-full fadeIn bg-custom-placeholder-green"
              data={variant.image}
              alt={product.title}
              loading="lazy"
              sizes="100%"
            />
          )}
        </div>
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
            <QuantitySection
              id={id}
              quantity={qty}
            />

            <RemoveItem itemID={id} />

          </div>
        </div>
      </div>

    </div>
  );
}


export function CartCount() {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}





function Badge({
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
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-custom-lightgrey/5"
    >
      {BadgeCounter}
    </Link>
  );
}

