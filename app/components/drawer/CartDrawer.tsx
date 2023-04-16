import {Drawer, DrawerProps} from '~/components/Drawer';
import {Await, Form, Link, useMatches} from '@remix-run/react';
import {Cart, CartLine} from '@shopify/hydrogen/storefront-api-types';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {CartAction} from '~/lib/type';
import {HiX} from 'react-icons/hi';
import {Suspense} from 'react';

function Empty() {
  return (
    <p>
      Your cart seems empty. Check out some of our{' '}
      <Link to="shop" className="underline decoration-offset-2">
        products
      </Link>
    </p>
  );
}

function Fallback() {
  return (
    <div className="w-full h-full grid place-items-cennter">
      <HiX className="w-5 h-5 animate-spin" />
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
  const isEmpty = lines.length === 0;

  return (
    <section className="px-4">
      {!isEmpty ? (
        <>
          <ul className="w-full grid grid-cols-1 gap-8">
            {lines.map(
              (l) =>
                l.id && (
                  <li key={l.id}>
                    <CartDrawerLineItem cartLine={l} />
                  </li>
                ),
            )}
          </ul>
          <div className="h-full w-full p-4 flex flex-col ">
            <Link
              onClick={closeDrawer}
              to="/cart"
              prefetch="intent"
              className="block text-center w-full max-w-[300px] py-3 bg-custom-black text-custom-white rounded-sm font-semibold uppercase"
            >
              View Cart.
            </Link>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </section>
  );
}

function CartDrawerLineItem({cartLine}: {cartLine: CartLine}) {
  const {id, quantity: qty, merchandise: variant} = cartLine;
  const product = variant.product;
  return (
    <div className="w-full h-fit flex items-center justify-start gap-8">
      <div className="w-fit rounded-sm overflow-hidden">
        {variant.image && (
          <Image
            className="w-full aspect-[4/5] h-[200px] object-cover"
            data={variant.image}
            alt={product.title}
            loading="lazy"
            widths={[200]}
            sizes="200"
          />
        )}
      </div>

      <div className="h-full grid grid-cols-1  gap-4">
        <h3 className="font-semibold text-xl">{product.title}</h3>
        <ul className="mt-6 flex flex-col gap-y-2">
          {variant.selectedOptions.map((option) => (
            <li key={option.name} className="text-custom-black/70">
              {option.name}:&nbsp;{option.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-end justify-between">
        {cartLine.cost.totalAmount && (
          <Money
            data={cartLine.cost.totalAmount}
            as="span"
            className="text-xl font-semibold"
            withoutTrailingZeros
          ></Money>
        )}
      </div>
    </div>
  );
}
