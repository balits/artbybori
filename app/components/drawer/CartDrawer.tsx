import {Drawer, DrawerProps} from '~/components/Drawer';
import {Await, Form, useMatches} from '@remix-run/react';
import {Cart, CartLine} from '@shopify/hydrogen/storefront-api-types';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {HiX} from 'react-icons/hi';
import {Suspense} from 'react';
import { Link } from '~/components/Link';
import { HiArrowPath } from 'react-icons/hi2';

function Empty() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-center text-lg mb-2'>
        Your cart seems empty.
      </p>
      <div>
        <Link to="/shop" className="underline decoration-offset-2">
          Browse our products
        </Link>
        &nbsp;or<br/>
        <Link to="/search" className="underline decoration-offset-2">
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
          {(cart) => <CartColumnView cart={cart} closeDrawer={onClose} />}
        </Await>
      </Suspense>
    </Drawer>
  );
}

function CartColumnView({
  cart,
  closeDrawer,
}: {
  cart: Cart;
  closeDrawer: () => void;
}) {
  const lines = cart?.lines ? flattenConnection(cart.lines) : [];

  return lines.length > 0 ? (
    <section className="h-full px-4 relative flex flex-col items-center justify-between">
      <ul className="h-full overflow-auto w-full flex flex-col items-start gap-8 pb-8">
        {lines.map(
          (l) =>
            l.id && (
              <li key={l.id} className="h-fit">
                <CartLineItem cartLine={l} />
              </li>
            )
        )}
      </ul>
      <div className="flex-shink-0 w-full my-2 flex flex-col ">
        <Link
          onClick={closeDrawer}
          to="/cart"
          prefetch="intent"
          className="py-3 text-center w-full bg-custom-black text-custom-white rounded-sm font-semibold uppercase"
        >
          View Cart.
        </Link>
      </div>
    </section>
  ) : (
      <section className='w-full h-full px-4 flex items-center justify-center'>
        <Empty />
      </section>
    )
}

function CartLineItem({cartLine}: {cartLine: CartLine}) {
  const {id, quantity: qty, merchandise: variant} = cartLine;
  const product = variant.product;
  return (
    <div className="w-full flex items-start justify-start gap-4">
      <div className="max-w-[150px] sm:max-w-[200px] h-fit rounded-sm overflow-hidden">
        {variant.image && (
          <Image
            className="w-full h-full aspect-[4/5]  object-cover"
            data={variant.image}
            alt={product.title}
            loading="lazy"
            widths={[100,200,300,400]}
            sizes="100%"
          />
        )}
      </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <h3 className="text-lg lg:text-xl font-bold text-left font-cantata ">{product.title}</h3>
          <div className='flex w-full justify-start'>
          {cartLine.cost.totalAmount && (
            <Money
              data={cartLine.cost.totalAmount}
              as="span"
              className="text-sm md:text-base h-fit"
              withoutTrailingZeros
            />
          )}
          </div>
          <ul className="flex flex-col gap-y-2">
            {variant.selectedOptions.filter(o => o.name != "Title").map((option) => (
              <li key={option.name} >
                <p className='opacity-80 text-sm md:text-base'>
                  <span className=''>{option.name}</span>:&nbsp;{option.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
