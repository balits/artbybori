import { useFetcher } from '@remix-run/react';
import { flattenConnection, Image, Money } from '@shopify/hydrogen';
import { Cart, CartLine } from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import { CartAction } from '~/lib/type';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { Link, Button, Heading, MyMoney, Text } from '../ui';
import { Check, Spinner, X, XCirlce } from '../global/Icon';
import Container from '../global/Container';

export function Fallback() {
  return (
    <Container className='scaling-mt-header'>
      <Heading spacing>Your cart is empty.</Heading>
    </Container>
  );
}

export default function CartView({ cart }: { cart: Cart | null }) {
  const isEmpty = cart?.lines.edges.length === 0
  const lines = cart?.lines ? flattenConnection(cart.lines) : [];

  return !isEmpty && cart ? (
    <Container className='scaling-mt-header mb-20 overflow-auto'>
      <Heading spacing>Your cart.</Heading>
      <div className='grid grid-cols-1 grid-rows-2 lg:grid-cols-5 lg:gap-x-6 lg:grid-rows-1'>
        <section aria-labelledby="cart-contents" className='lg:col-span-3 flex flex-col items-start justify-start'>
          <ul className="">
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
        <div className='flex items-start justify-center lg:col-span-2'>
          {cart && <CartSummary cart={cart} className=" w-full max-w-[600px] lg:ml-4" />}
        </div>
      </div>
    </Container>
  ) : <Fallback />;
}

type CartLineItemProps = {
  cartLine: CartLine;
  comparePrice?: boolean;
};
function CartLineItem({ cartLine, comparePrice = false }: CartLineItemProps) {
  const { id, quantity: qty, merchandise: variant } = cartLine;
  const product = variant.product;


  const realOptions = variant.selectedOptions.filter((o) => o.name !== "Title" && o.name !== "title")

  return (
    <section className="flex w-full py-10 border-t border-t-custom-placeholder-green">
      <Link to={`/products/${product.handle}`} prefetch="intent" className='card-image aspect-[4/5] w-[180px] md:w-[200px] lg:w-[300px]'>
        {variant.image && (
          <Image
            data={variant.image}
            alt={variant.image.altText ?? product.title}
            widths={[180, 250, 300]}
            sizes="100%"
            className="rounded-md shrink"
          />
        )}
      </Link>

      <div className='ml-4 lg:ml-8 h-full w-full '>
        <div className="w-full grid grid-cols-2 gap-x-4 ">
          <div className="flex flex-col gap-y-1 ">
            <Link to={`/products/${product.handle}`} prefetch="intent">
              <Text as="h2" size='sm' color='grey' bold>
                {product.title}
              </Text>
            </Link>
            <ul className=" flex gap-4">
              {realOptions.map((option) => (
                <li key={option.name} >
                  <Text size='sm' color='lightgrey' className='capitalize'>
                    {option.value}
                  </Text>
                </li>
              ))}
            </ul>
            <MyMoney data={cartLine.cost.totalAmount} size="sm" />

            {variant.availableForSale ? (
              <div className='mt-12 flex items-center gap-x-3'>
                <Check className='text-green-400' />
                <Text size='sm'>In stock</Text>
              </div>
            ) : (
              <div className='mt-12 flex items-center gap-x-3'>
                <XCirlce className='text-red-400' />
                <Text size='sm'>Out of stock</Text>
              </div>
            )}
          </div>

          <div className="flex items-start justify-between">
            <label htmlFor={`quantity-${id}`} className="sr-only">
              Quantity, {qty}
            </label>

            <QuantitySection
              id={id}
              quantity={qty}
            />

            <div className='ml-4'>
              <RemoveItem itemID={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CartSummaryProps = {
  cart: Cart;
  className: string;
};

function CartSummary({ cart, className }: CartSummaryProps) {
  return (
    <section aria-labelledby='cart-summary' className={clsx("flex flex-col items-start px-4", className)}>
      <Text id="cart-summary-heading" as={"h2"} font="font-sans" bold size='lg' color='grey' >
        Order summary
      </Text>

      <dl className="mt-4 divide-y divide-custom-placeholder-green w-full">
        <div className="flex items-center justify-between w-full py-4">
          <Text size='sm' as={"dt"} color="grey">Subtotal:</Text>
          <MyMoney
            data={cart.cost.subtotalAmount}
            className="text-xs md:text-sm font-semibold"
            as={"dd"}
          />
        </div>

        <div className="flex items-center justify-between w-full py-4">
          <Text size='sm' as={"dt"} color="grey" >Shipping</Text>
          <Text size='sm' as={"dd"} color="grey" >Calculated at checkout</Text>
        </div>

        <div className="flex items-center justify-between w-full py-4">
          <Text size='md' as={"dt"} color="black" bold>Total:</Text>
          <MyMoney
            data={cart.cost.totalAmount}
            className="text-xs md:text-sm font-semibold"
            as={"dd"}
          />
        </div>

      </dl>
      <div className="flex w-full flex-col items-start gap-4 mt-4">
        {cart.checkoutUrl && (
          <Button
            to={cart.checkoutUrl}
            variant="signature"
            width="full"
          >
            Check out
          </Button>
        )}
        <Button
          variant="light"
          to="/shop"
          width="full"
        >
          Continue shopping
        </Button>
      </div>
    </section>
  );
}


type QuantitySectionProps = {
  id: string,
  quantity: number,
}

export function QuantitySection({
  id,
  quantity
}: QuantitySectionProps) {
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center justify-center">
      <DecrementQuantity
        id={id}
        quantity={prevQuantity}
        disabled={quantity <= 1}
      />
      <Text className="p-2 w-full h-full grid  place-items-center">
        {quantity}
      </Text>
      <IncrementQuantity
        id={id}
        quantity={nextQuantity}
        disabled={false}
      />
    </div>
  )
}

type QuantityActionProps = {
  id: string;
  quantity: number;
  disabled: boolean;
};

export function DecrementQuantity({ id, quantity, disabled }: QuantityActionProps) {
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
        value={JSON.stringify([{ id, quantity }])}
      />
      <button
        name="decrease-quantity"
        aria-label="Decrease quantity"
        value={quantity}
        disabled={disabled}
        className="disabled:opacity-40 disabled:cursor-not-allowed text-custom-lightgrey hover:text-custom-black"
      >
        <HiMinus className="w-8 h-8 p-2" />
      </button>
    </fetcher.Form>
  );
}

export function IncrementQuantity({ id, quantity, disabled }: QuantityActionProps) {
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
        value={JSON.stringify([{ id, quantity }])}
      />
      <button
        name="decrease-quantity"
        aria-label="Decrease quantity"
        value={quantity}
        type="submit"
        disabled={disabled}
        className="text-custom-lightgrey hover:text-custom-black"
      >
        <HiPlus className="w-8 h-8 p-2" />
      </button>
    </fetcher.Form>
  );
}

export function RemoveItem({
  itemID
}: {
  itemID: string
}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type={'hidden'}
        name="cartAction"
        value={CartAction.REMOVE_FROM_CART}
      />
      <input type="hidden" name="linesIds" value={JSON.stringify([itemID])} />
      <span className="sr-only">Remove</span>
      <button className="p-2 text-custom-lightgrey hover:text-custom-black" type="submit">
        {fetcher.state === "submitting" ? <Spinner /> : <X />}
      </button>
    </fetcher.Form>

  )
}
