import {useFetcher} from '@remix-run/react';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {Cart, CartLine} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import {HiX} from 'react-icons/hi';
import {CartAction} from '~/lib/type';
import {HiPlus, HiMinus} from 'react-icons/hi';

export function Fallback() {
  return (
    <section aria-labelledby="cart-contents">
<<<<<<< HEAD
      <h1 className="text-5xl font-cantata mb-8">Your cart.</h1>
=======
      <h1 className="text-8xl font-cantata mb-8">Your cart.</h1>
>>>>>>> refs/remotes/origin/main
    </section>
  );
}

type CartViewProps = {
  cart: Cart | null;
};
export default function CartView({cart}: CartViewProps) {
  const isEmpty = cart?.lines.edges.length || false;
  const lines = cart?.lines ? flattenConnection(cart.lines) : [];
  return isEmpty ? (
    <>
      <section aria-labelledby="cart-contents">
<<<<<<< HEAD
        <h1 className="text-5xl font-cantata mb-8">Your cart.</h1>
=======
        <h1 className="text-8xl font-cantata mb-8">Your cart.</h1>
>>>>>>> refs/remotes/origin/main
        <ul className="border-t-2 border-t-custom-black py-8 grid grid-cols-1 gap-y-12">
          {lines.map(
            (l) =>
              l.id && (
                <li key={l.id}>
                  <CartLineItem cartLine={l} />
                </li>
              ),
          )}
        </ul>
      </section>
      {cart && <CartSummary cart={cart} />}
    </>
  ) : (
<<<<<<< HEAD
    <h1 className="text-5xl font-cantata mb-4">Your cart is empty.</h1>
=======
    <h1 className="text-8xl font-cantata mb-4">Your cart is empty.</h1>
>>>>>>> refs/remotes/origin/main
  );
}

type CartLineItemProps = {
  cartLine: CartLine;
  comparePrice?: boolean;
};
function CartLineItem({cartLine, comparePrice = false}: CartLineItemProps) {
  const fetcher = useFetcher();

  const {id, quantity: qty, merchandise: variant} = cartLine;
  const product = variant.product;

  const prevQuantity = Number(Math.max(0, qty - 1).toFixed(0));
  const nextQuantity = Number((qty + 1).toFixed(0));

  return (
    <div className="flex gap-x-16 h-fit w-full ">
      {variant.image && (
        //TODO: if image does not exits, render the `Art by Bori` square logo with the same resolutions
        //eventough every product should have an image, its a nice fallback
        <Image
          data={variant.image}
          className="object-center object-cover flex-shrink-0 h-80 w-80  rounded-sm"
          alt={product.title}
        />
      )}
      <div className="w-full h-80 py-4 border-b-2 border-b-custom-black grid grid-rows-1 grid-cols-4">
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-tight tracking-tight text-3xl">
            {product.title}
          </h3>
          <ul className="mt-6 flex flex-col gap-y-2">
            {variant.selectedOptions.map((option) => (
              <li key={option.name} className="text-custom-black/70">
                {option.name}:&nbsp;{option.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start justify-center">
          <label htmlFor={`quantity-${id}`} className="sr-only">
            Quantity, {qty}
          </label>
          <div className="flex items-center justify-center">
            <DecrementQuantity
              id={id}
              quantity={prevQuantity}
              disabled={qty <= 1}
            />
            <div className="p-2 w-full h-full grid  place-items-center">
              {qty}
            </div>
            <IncrementQuantity
              id={id}
              quantity={nextQuantity}
              disabled={false}
            />
          </div>
        </div>
        <span></span>

        <div className="flex flex-col items-end justify-between">
          {cartLine.cost.totalAmount && (
            <Money
              data={cartLine.cost.totalAmount}
              as="span"
              className="text-xl font-semibold"
              withoutTrailingZeros
            ></Money>
          )}
          <fetcher.Form action="/cart" method="post">
            <input
              type={'hidden'}
              name="cartAction"
              value={CartAction.REMOVE_FROM_CART}
            />
            <input type="hidden" name="linesIds" value={JSON.stringify([id])} />
            <span className="sr-only">Remove</span>
            <button className="p-4" type="submit">
              <HiX className="h-6 w-6 " />
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

type CartSummaryProps = {
  cart: Cart;
};
function CartSummary({cart}: CartSummaryProps) {
  const btn =
    'hover:opacity-80 active:opacity-60 text-center cursor-pointer uppercase text-xl py-3 w-72 font-semibold tracking-tight';
  return (
    <section className="flex flex-col items-end gap-y-16 mb-16">
      <h2 id="cart-summary-heading" className="sr-only">
        Order summary
      </h2>
      <div className="space-y-2">
        <div className="flex items-end justify-end">
          <p>Subtotal:&nbsp;</p>
          <Money
            className="font-semibold text-xl"
            data={cart.cost.subtotalAmount}
            withoutTrailingZeros
          ></Money>
        </div>
        <p>Shipping calculated at checkout.</p>
      </div>
      <div className="flex gap-x-12">
        <a
          className={clsx(
            btn,
            'bg-custom-white text-custom-black border border-custom-black',
          )}
          href="/shop"
        >
          Continue shopping
        </a>
        {cart.checkoutUrl ? (
          <a
            className={clsx(
              btn,
              'bg-custom-signature-green text-custom-white border border-custom-signature-green',
              'text-center',
            )}
            href={cart.checkoutUrl}
          >
            Check out
          </a>
        ) : (
          <button
            className={clsx(
              btn,
              'bg-custom-signature-green text-custom-white border border-custom-signature-green',
              'cursor-not-allowed opacity-80',
            )}
          >
            Check out
          </button>
        )}
      </div>
    </section>
  );
}

type QuantityProps = {
  id: string;
  quantity: number;
  disabled: boolean;
};

function DecrementQuantity({id, quantity, disabled}: QuantityProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      className="p-0 m-0 grid place-items-center"
      action="/cart"
      method="post"
    >
      <input type={'hidden'} name="cartAction" value={CartAction.UPDATE_CART} />
      <input
        type={'hidden'}
        name="lines"
        value={JSON.stringify([{id, quantity}])}
      />
      <button
        name="decrease-quantity"
        aria-label="Decrease quantity"
        value={quantity}
        disabled={disabled}
        className="disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <HiMinus className="w-8 h-8 p-2" />
      </button>
    </fetcher.Form>
  );
}

function IncrementQuantity({id, quantity, disabled}: QuantityProps) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      className="p-0 m-0 grid place-items-center"
      action="/cart"
      method="post"
    >
      <input type={'hidden'} name="cartAction" value={CartAction.UPDATE_CART} />
      <input
        type={'hidden'}
        name="lines"
        value={JSON.stringify([{id, quantity}])}
      />
      <button
        name="decrease-quantity"
        aria-label="Decrease quantity"
        value={quantity}
        type="submit"
        disabled={disabled}
      >
        <HiPlus className="w-8 h-8 p-2" />
      </button>
    </fetcher.Form>
  );
}
